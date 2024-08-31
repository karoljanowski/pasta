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

export type CartItem = {
    productId: number
    productName: string
    productPrice: number
    quantity: number
  }
  
export type CartStore = {
    items: CartItem[]
    totalQuantity: number,
    totalPrice: number,
    initializeCart: () => void
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    clearCart: () => void
}