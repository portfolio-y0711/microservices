import { IAmqpConnector } from '@realtime/server/amqp'
import { ISocketConnector } from '@realtime/server/socket.io'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'

export const onUserUpdatedConsumer =
  async (context: {
    amqpConnector: IAmqpConnector
    socketConnector: ISocketConnector
    feedStore: IFeedStore
  }) => {
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
      LOGGER.debug('[@realtime/amqp-consumer]: on-user-updated')
      const { loginUserUid } = JSON.parse(message.content.toString())
      const socketConn = socketConnector.getSocket('/user')
      socketConn
        .to(loginUserUid)
        .emit('userUpdated', 'user updated')

      LOGGER.info(`[@realtime/amqp-consumer]: on-user-updated to '${loginUserUid}'`)
    })
  }
