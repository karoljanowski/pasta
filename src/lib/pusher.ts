
import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
    appId: "1845597",
    key: "0f73d378850dbc154d82",
    secret: "fdabb61a45ff6ceb029c",
    cluster: "eu",
    useTLS: true
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: 'eu',
})
