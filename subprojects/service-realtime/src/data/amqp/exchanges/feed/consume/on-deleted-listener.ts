import { IAmqpConnector } from '@realtime/data/amqp/connection'
import { ISocketConnector } from '@realtime/data/socket.io/connection'

export const OnFeedDeletedListener =
  (context: {
    amqpConnector: IAmqpConnector
    socketConnector: ISocketConnector
  }) =>
  async () => {
    const { amqpConnector, socketConnector } = context

    const amqpConn = await amqpConnector.getConnection()
    const ch = await amqpConn.createChannel()

    const exchangeName = 'feed'
    await ch.assertExchange(exchangeName, 'direct', {
      durable: false,
      autoDelete: false,
    })
    const routingKey = 'putdeleted'
    const queueName = 'putdeleted_queue'

    await ch.assertQueue(queueName, {
      exclusive: true,
      durable: false,
      autoDelete: false,
    })
    await ch.bindQueue(queueName, exchangeName, routingKey)

    await ch.consume(queueName, async function (message) {
      try {
        if (message) {
          console.log(JSON.parse(message.content.toString()))
        }
      } catch (e) {
        console.log(e)
      }
      const socketConn = socketConnector.getSocket('/feed')
      socketConn.emit('feedUpdated', 'feed updated')
    })
  }
