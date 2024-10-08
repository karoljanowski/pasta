import { OrderStatus, Prisma } from "@prisma/client";

export interface OrderStatusProps {
    status: OrderStatus;
    id: number
}

export type OrderWithProducts = Prisma.OrderGetPayload<{
    include: {
        orderItems: {
            include: {
                product: true
            }
        }
    }
}>

export type CheckoutFormState = {
    errors?: {
        cartItems?: string[] | undefined;
        totalPrice?: string[] | undefined;
        customerFullName?: string[] | undefined;
        customerCity?: string[] | undefined;
        customerStreet?: string[] | undefined;
        paymentType?: string[] | undefined;
      };
    success: boolean,
    orderId?: number 
}

export type ProductFormState = {
    success: boolean,
    errors?: {
        id?: string[] | undefined;
        name?: string[] | undefined;
        description?: string[] | undefined;
        price?: string[] | undefined;
        ingredients?: string[] | undefined;
        image?: string[] | undefined;
      };
}

export type ImageUploadFormState = {
    success: boolean,
    errors?: {
        image?: string[] | undefined;
      };
}

export type CartItem = {
    productId: number
    productName: string
    productPrice: number
    quantity: number
  }
  
export type CartStore = {
    items: CartItem[]
    totalQuantity: number
    totalPrice: number
    cartOpen: boolean
    cartTimeout: NodeJS.Timeout | null
    initializeCart: () => void
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    clearCart: () => void
    toggleCart: (open: boolean) => void
}

export type DeliveryTimeFormState = {
    success: boolean,
    error?: {
        time?: string[] | undefined;
      };
}

export type BestProductsFormState = {
    success: boolean,
    errors?: string[] | undefined;
}

export type LoginFormState = {
    success: boolean,
    cretentailsError?: string | undefined,
    errors?: {
        username?: string[] | undefined
        password?: string[] | undefined
    }
}

export type ChangePasswordFormState = {
    success: boolean,
    error?: string | undefined,
    errors?: {
        oldPassword?: string[] | undefined
        newPassword?: string[] | undefined
        confirmPassword?: string[] | undefined
    }
}