'use server'
import { pusherServer } from "./pusher"
import { prisma } from "./prisma"


export const test = (asd: string) => {
    pusherServer.trigger('channel', 'event', asd)
}

export const getOrders = () => {
    return prisma.order.findMany({
      include: {
        customer: true, // Include the related Customer data
      },
    });
  };