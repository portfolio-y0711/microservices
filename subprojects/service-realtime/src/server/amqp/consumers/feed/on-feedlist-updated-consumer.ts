import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'

export const onFeedlistUpdatedConsumer = async (context: {
  socketConnector: ISocketConnector,
  amqpConnector: IAmqpConnector,
  feedStore: IFeedStore
}) => {
  const { amqpConnector, socketConnector, feedStore } = context

  const amqpConn = await amqpConnector.getConnection()
  const ch = await amqpConn.createChannel()

  const exchangeName = 'feed'
  await ch.assertExchange(exchangeName, 'direct', {
    durable: false,
    autoDelete: false,
  })
  const routingKey = 'feedlistUpdated'
  const queueName = 'feedlistUpdated_queue'

  await ch.assertQueue(queueName, {
    exclusive: true,
    durable: false,
    autoDelete: false,
  })
  await ch.bindQueue(queueName, exchangeName, routingKey)

  await ch.consume(queueName, async function (message) {
    LOGGER.debug('[@realtime/amqp-consumer]: on-feedlist-updated')
    const { loginUserUid } = JSON.parse(message.content.toString())
    const socketConn = socketConnector.getSocket('/feed')

    if (feedStore.hasUser(loginUserUid)) {
      socketConn
        .to(loginUserUid)
        .emit('feedlistUpdated', 'feedlist updated')
      LOGGER.info(`[@realtime/amqp-consumer]: on-feedlist-updated to ${loginUserUid}`)
    }
  })
}