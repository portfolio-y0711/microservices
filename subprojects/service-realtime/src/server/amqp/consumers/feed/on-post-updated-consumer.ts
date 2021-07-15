import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { IFeedStore } from '@realtime/store'
import Logger from '@config/log'

export const onPostUpdatedConsumer = async (context: {
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
  const routingKey = 'postUpdated'
  const queueName = 'postUpdated_queue'

  await ch.assertQueue(queueName, {
    exclusive: true,
    durable: false,
    autoDelete: false,
  })
  await ch.bindQueue(queueName, exchangeName, routingKey)

  await ch.consume(queueName, async function (message) {
    Logger.debug('[@realtime/amqp-consumer]: on-post-updated')
    const { loginUserUid } = JSON.parse(message.content.toString())
    const socketConn = socketConnector.getSocket('/feed')

    socketConn
      .to(loginUserUid)
      .emit('postUpdated', 'post updated')
    Logger.info(`[@realtime/amqp-consumer]: on-post-updated to ${JSON.stringify(JSON.parse(message.content.toString()))}`)
  })

}