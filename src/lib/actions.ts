'use server'
// import { pusherServer } from "./pusher"
import { prisma } from "./prisma"
import { Order } from "@prisma/client"
import { CartItem, CheckoutFormState, OrderStatusProps } from "./types"  
import { z, ZodError } from 'zod';

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

        // await pusherServer.trigger('channel', 'newOrder', newOrder);

        return { success: true, orderId: newOrder.id };
    } catch (error) {
        return { success: false };
    }
};


export const handleChangeStatus = async ({status, id} : OrderStatusProps) => {
    await prisma.order.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    })
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
    return await prisma.product.findMany()
  };