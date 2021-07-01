import { IAmqpConnector } from '@realtime/data/amqp/connection'
import { ISocketConnector } from '@realtime/data/socket.io/connection'

export const OnPutUserUpdatedListener =
  (context: {
    amqpConnector: IAmqpConnector
    socketConnector: ISocketConnector
  }) =>
  async () => {
    const { amqpConnector, socketConnector } = context

    const amqpConn = await amqpConnector.getConnection()
    const ch = await amqpConn.createChannel()

    const exchangeName = 'user'
    await ch.assertExchange(exchangeName, 'direct', {
      durable: false,
      autoDelete: false,
    })
    const routingKey = 'user_updated'
    const queueName = 'user_updated_queue'

    await ch.assertQueue(queueName, {
      exclusive: true,
      durable: false,
      autoDelete: false,
    })
    await ch.bindQueue(queueName, exchangeName, routingKey)

    await ch.consume(queueName, async function (message) {
      console.log('queue arrived')
      try {
        if (message) {
          console.log(JSON.parse(message.content.toString()))
        }
      } catch (e) {
        console.log(e)
      }
      const socketConn = socketConnector.getSocket('/user')
      socketConn.emit('userUpdated', 'user updated')
    })
  }
