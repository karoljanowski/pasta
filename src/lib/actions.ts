'use server'
import { pusherServer } from "./pusher"
export const test = (asd: string) => {
    pusherServer.trigger('channel', 'event', asd)
}