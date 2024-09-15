'use server'
import { pusherServer } from "./pusher"
import { prisma } from "./prisma"
import { CartItem, CheckoutFormState, ImageUploadFormState, OrderStatusProps, ProductFormState } from "./types"  
import { z } from 'zod';
import { revalidatePath } from "next/cache"
import { Product } from "@prisma/client";
import { readdirSync, unlinkSync, writeFileSync } from "fs";
import { list, put, del } from '@vercel/blob';

const CartItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().positive()
});

const OrderSchema = z.object({
    cartItems: z.string()
    .transform((data) => JSON.parse(data))
    .refine((array) => CartItemSchema.array().safeParse(array).success, {
        message: "Bubel 1",
    }),
    totalPrice: z.string().refine((value) => {
        return !isNaN(Number(value))
    }, {
        message: 'Bubel 2'
    })
    .transform(value => Number(value)),
    customerFullName: z.string().min(1, 'Full name is required'),
    customerCity: z.string().min(1, 'City is required'),
    customerStreet: z.string().min(1, 'Street is required'),
    paymentType: z.enum(['Cash', 'Card'], {
        errorMap: () => ({ message: 'Invalid payment type' })
    })
});

export const handleNewOrder = async (state: CheckoutFormState, formData: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
        const parsedResult = OrderSchema.safeParse({
            cartItems: formData.get('cartItems'),
            totalPrice: formData.get('totalPrice'),
            customerFullName: formData.get('customerFullName'),
            customerCity: formData.get('customerCity'),
            customerStreet: formData.get('customerStreet'),
            paymentType: formData.get('paymentType')
        });

        if (!parsedResult.success) {
            return {
                success: false,
                errors: parsedResult.error.flatten().fieldErrors
              };
        }

        const validatedData = parsedResult.data;

        const newOrder = await prisma.order.create({
            data: {
                customerFullname: validatedData.customerFullName,
                customerCity: validatedData.customerCity,
                customerStreet: validatedData.customerStreet,
                status: 'Preparing',
                payment: validatedData.paymentType,
                time: new Date(),
                total: validatedData.totalPrice,
                orderItems: {
                    create: validatedData.cartItems.map((item: CartItem) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        await pusherServer.trigger('channel', 'newOrder', newOrder);
        revalidatePath('/dashboard/orders')

        return { success: true, orderId: newOrder.id };
    } catch (error) {
        return { success: false };
    }
};


export const handleChangeStatus = async ({status, id} : OrderStatusProps) => {
    try{
        await prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })
        revalidatePath('/dashboard/orders')
        return { success: true }
    }catch (error) {
        return { success: false }
    }
}

export const getOrders = async () => {
    return await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })
  };

export const getOrder = async (id: number) => {
    return await prisma.order.findFirst({
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        where: {
            id: id
        }
    })
  };

export const getMenu = async () => {
    return await prisma.product.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};

export const getProduct = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return await prisma.product.findFirst({
        where: {
            id: id
        }
    });
}

const ProductEditSchema = z.object({
    id: z.string().transform(value => Number(value)),
    name: z.string().min(1, 'Name is required'),
    price: z.string().refine((value) => {
        return !isNaN(Number(value)) && Number(value) > 0
    }, {
        message: 'Price has to be positive number'
    })
    .transform(value => Number(value)),
    description: z.string().min(1, 'Description is required'),
    ingredients: z.string()
    .transform((data) => JSON.parse(data))
    .refine((array) => z.array(z.string()).safeParse(array).success, {
        message: 'Invalid ingredients'
    }),
    image: z.string().min(1, 'Image is required'),
});

const ProductAddSchema = ProductEditSchema.omit({id: true});

export const editProduct = async (state: ProductFormState, formData: FormData) => {
    try {
        const parsedResult = ProductEditSchema.safeParse({
            id: formData.get('id'),
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            ingredients: formData.get('ingredients'),
            image: formData.get('image')
        });

        if (!parsedResult.success) {
            return {
                success: false,
                errors: parsedResult.error.flatten().fieldErrors
              };
        }

        const validatedData = parsedResult.data;

        await prisma.product.update({
            where: {
                id: validatedData.id
            },
            data: {
                name: validatedData.name,
                price: validatedData.price,
                description: validatedData.description,
                ingredients: validatedData.ingredients,
                image: validatedData.image
            }
        });

        revalidatePath('/dashboard/menu')
        return { success: true }
    }catch (error) {
        return {success: false}
    }
}

export const addProduct = async (state: ProductFormState, formData: FormData) => {
    try {
        const parsedResult = ProductAddSchema.safeParse({
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            ingredients: formData.get('ingredients'),
        });

        if (!parsedResult.success) {
            return {
                success: false,
                errors: parsedResult.error.flatten().fieldErrors
              };
        }

        const validatedData = parsedResult.data;

        await prisma.product.create({
            data: {
                name: validatedData.name,
                price: validatedData.price,
                description: validatedData.description,
                ingredients: validatedData.ingredients,
                active: true,
                image: ''
            }
        });

        revalidatePath('/dashboard/menu')
        return { success: true }
    }catch (error) {
        return {success: false}
    }
}

export const hideProduct = async (id: number) => {
    try {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                active: false
            }
        })
        revalidatePath('/dashboard/menu')
        return { success: true }
    }catch (error) {
        return { success: false }
    }
}

export const showProduct = async (id: number) => {
    try {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                active: true
            }
        })
        revalidatePath('/dashboard/menu')
        return { success: true }
    }catch (error) {
        return { success: false }
    }
}

export const duplicateProduct = async (id: number) => {
    try{
        const product = await prisma.product.findFirst({
            where: {
                id: id
            }
        })

        if (!product) {
            return { success: false, error: 'Product not found' }
        }

        await prisma.product.create({
            data: {
                name: product.name,
                price: product.price,
                active: product.active,
                description: product.description,
                ingredients: product.ingredients,
                image: product.image
            }
        })

        revalidatePath('/dashboard/menu')
        return { success: true }
    }
    catch (error) {
        return { success: false, error: 'Failed to duplicate product' }
    }
}

export const deleteProduct = async (id: number) => {
    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
        revalidatePath('/dashboard/menu')
        return { success: true }
    }catch (error) {
        return { success: false }
    }
}
const MAX_FILE_SIZE = 4500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 4.5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
})

export const addFile = async (state: ImageUploadFormState, formData: FormData ) => {
    try {
        const parsedResult = fileSchema.safeParse({
            image: formData.get('file')
        });
        if(parsedResult.error) {
            return {
                success: false,
                error: parsedResult.error.errors[0].message
            }
        }

        const parsedData = parsedResult.data
        const imageFile = parsedData.image as File

        await put(imageFile.name, imageFile, {
            access: 'public',
        });

        revalidatePath('/dashboard/file-manager')
        return { success: true }
    }
    catch (error) {
        return { success: false }
    }   
}

export const getFiles = async () => {
    try {
        const blobs = await list()
        return { success: true, files: blobs.blobs }
    } catch (error) {
        return { success: false }
    }
}

export const deleteFile = async (image: string) => {
    try {
        await del(image)
        revalidatePath('/dashboard/file-manager')
        return { success: true }
    }catch (error) {
        return { success: false }
    }

}
