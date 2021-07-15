import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { FeedEvent } from '@realtime/server/socket.io/vo'
import { IFeedStore } from '@realtime/store'
import Logger from '@config/log'

export const onPostListener = (socket: any, context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) => {
  const { POST } = FeedEvent
  const { amqpConnector } = context

  socket.on(POST, async ({ loginUserUid, parentUid, msg }) => {
    Logger.debug('[@realtime/socket]: on-cmd-post')
    Logger.info(`[@realtime/socket]: ${JSON.stringify({ loginUserUid, parentUid, msg })}`)

    const conn = await amqpConnector.getConnection()
    const ch = await conn.createChannel()

    const exchangeName = 'feed'
    await ch.assertExchange(exchangeName, 'direct', {
      durable: false,
      autoDelete: false,
    })
    const routingKey = 'post'
    const payload = JSON.stringify({ parentUid, loginUserUid, msg })
    ch.publish(exchangeName, routingKey, Buffer.from(payload), {
      persistent: false,
    })
  })
}