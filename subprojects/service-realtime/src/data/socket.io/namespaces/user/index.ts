import { IAmqpConnector } from '@realtime/data/amqp/connection'
import { ISocketConnector } from '@realtime/data/socket.io/connection'
import { UserEvent } from '../../vo'

export const Init = (context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
}) => {
  return () => {
    const { socketConnector, amqpConnector } = context
    const { CONNECT, DISCONNECT, TOGGLEFOLLOW, USERUPDATED } = UserEvent

    const SocketIO = socketConnector.getSocket('/user')

    SocketIO.on(CONNECT, (socket: any) => {
      console.log('Connected user-socket on port')

      socket.on(TOGGLEFOLLOW, async (payload: any) => {
        console.log(payload)
        const conn = await amqpConnector.getConnection()
        const ch = await conn.createChannel()

        const exchangeName = 'user'
        await ch.assertExchange(exchangeName, 'direct', {
          durable: false,
          autoDelete: false,
        })
        const routingKey = 'put_toggle_follow'
        const msg = JSON.stringify(payload)
        ch.publish(exchangeName, routingKey, Buffer.from(msg), {
          persistent: false,
        })
      })

      // socket.on(FOLLOW, async(payload: any) => {
      //   console.log(payload)
      //   const conn = await amqpConnector.getConnection()
      //   const ch = await conn.createChannel()

      //   const exchangeName = 'user'
      //   await ch.assertExchange(exchangeName, 'direct', {
      //     durable: false,
      //     autoDelete: false
      //   })
      //   const routingKey = 'putfollow'
      //   const msg = JSON.stringify(payload)
      //   ch.publish(exchangeName, routingKey, Buffer.from(msg), { persistent: false })
      // })

      // socket.on(UNFOLLOW, async(payload: any) => {
      //   console.log(payload)
      //   const conn = await amqpConnector.getConnection()
      //   const ch = await conn.createChannel()

      //   const exchangeName = 'user'
      //   await ch.assertExchange(exchangeName, 'direct', {
      //     durable: false,
      //     autoDelete: false
      //   })
      //   const routingKey = 'putunfollow'
      //   const msg = JSON.stringify(payload)
      //   ch.publish(exchangeName, routingKey, Buffer.from(msg), { persistent: false })
      // })

      socket.on(USERUPDATED, async (payload: any) => {
        console.log(payload)
        const conn = await amqpConnector.getConnection()
        const ch = await conn.createChannel()

        const exchangeName = 'user'
        await ch.assertExchange(exchangeName, 'direct', {
          durable: false,
          autoDelete: false,
        })
        const routingKey = 'userupdated'
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

export interface ISocketUserService {
  init: () => void
}

export const createUserService = (context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
}): ISocketUserService => {
  const init = Init(context)

  return {
    init,
  }
}
