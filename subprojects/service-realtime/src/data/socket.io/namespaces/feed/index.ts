import { IAmqpConnector } from '@realtime/data/amqp/connection'
import { ISocketConnector } from '@realtime/data/socket.io/connection'
import { FeedEvent } from '../../vo'

export const Init = (context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
}) => {
  return () => {
    const { socketConnector, amqpConnector } = context
    const { CONNECT, DISCONNECT, POST, PUTLIKE, PUTDISLIKE, PUTDELETE } = FeedEvent

    const SocketIO = socketConnector.getSocket('/feed')

    SocketIO.on(CONNECT, (socket: any) => {
      console.log('Connected feed-socket on port')

      socket.on(POST, async (payload: any) => {
        const conn = await amqpConnector.getConnection()
        const ch = await conn.createChannel()

        const exchangeName = 'feed'
        await ch.assertExchange(exchangeName, 'direct', {
          durable: false,
          autoDelete: false,
        })
        const routingKey = 'post'
        const msg = JSON.stringify(payload)
        ch.publish(exchangeName, routingKey, Buffer.from(msg), {
          persistent: false,
        })
      })

      socket.on(PUTLIKE, async (payload: any) => {
        const conn = await amqpConnector.getConnection()
        const ch = await conn.createChannel()

        const exchangeName = 'feed'
        await ch.assertExchange(exchangeName, 'direct', {
          durable: false,
          autoDelete: false,
        })
        const routingKey = 'putlike'
        const msg = JSON.stringify(payload)
        ch.publish(exchangeName, routingKey, Buffer.from(msg), {
          persistent: false,
        })
      })

      socket.on(PUTDISLIKE, async (payload: any) => {
        const conn = await amqpConnector.getConnection()
        const ch = await conn.createChannel()

        const exchangeName = 'feed'
        await ch.assertExchange(exchangeName, 'direct', {
          durable: false,
          autoDelete: false,
        })
        const routingKey = 'putdislike'
        const msg = JSON.stringify(payload)
        ch.publish(exchangeName, routingKey, Buffer.from(msg), {
          persistent: false,
        })
      })

      socket.on('putdelete', async (payload: any) => {
        const conn = await amqpConnector.getConnection()
        const ch = await conn.createChannel()

        const exchangeName = 'feed'
        await ch.assertExchange(exchangeName, 'direct', {
          durable: false,
          autoDelete: false,
        })
        const routingKey = 'putdelete'
        const msg = JSON.stringify(payload)
        ch.publish(exchangeName, routingKey, Buffer.from(msg), {
          persistent: false,
        })
      })

      socket.on(DISCONNECT, () => {
        console.log('Client disconnected')
      })
    })
  }
}

export interface ISocketFeedService {
  init: () => void
}

export const createFeedService = (context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
}): ISocketFeedService => {
  const init = Init(context)

  return {
    init,
  }
}
