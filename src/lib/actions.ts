'use server'
import { pusherServer } from "./pusher"
import { prisma } from "./prisma"
import { Order } from "@prisma/client"
import { OrderStatusProps } from "./types"

export const handleNewOrder = async () => {

    const newOrder = await prisma.order.create({
        data: {
                customerCity: 'miasto',
                customerFullname: 'Karol Janowski',
                customerStreet: 'ulica 23',
                status: 'Preparing',
                time: new Date(),
                total: 123,
                orderItems: {
                    create: [
                        {
                            productId: 1,
                            quantity: 3
                        },
                        {
                            productId: 2,
                            quantity: 1
                        }
                    ]
                }
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    console.log(newOrder.orderItems[0].product.name)

    await pusherServer.trigger('channel', 'newOrder', newOrder)
    
}

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

export const getOrders = () => {
    return prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })
  };

export const getMenu = () => {
    return prisma.product.findMany()
  };