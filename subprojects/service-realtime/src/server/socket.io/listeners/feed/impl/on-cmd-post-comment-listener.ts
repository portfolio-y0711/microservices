import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { FeedEvent } from '@realtime/server/socket.io/vo'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'

export const onAddCommentListener = async (socket: any, context: {
  socketConnector: ISocketConnector,
  amqpConnector: IAmqpConnector,
  feedStore: IFeedStore
}) => {
  const { amqpConnector } = context
  const { POSTADDCOMMENT } = FeedEvent

  socket.on(POSTADDCOMMENT, async (payload: any) => {
    LOGGER.debug('[@realtime/socket-listener]: on-cmd-comment-add')
    const conn = await amqpConnector.getConnection()
    const ch = await conn.createChannel()

    const exchangeName = 'feed'
    await ch.assertExchange(exchangeName, 'direct', {
      durable: false,
      autoDelete: false,
    })
    const routingKey = 'postaddcomment'
    const msg = JSON.stringify(payload)
    LOGGER.info(`[@realtime/socket]: on-comment-add '${JSON.stringify(payload)}'`)
    ch.publish(exchangeName, routingKey, Buffer.from(msg), {
      persistent: false,
    })
  })

}