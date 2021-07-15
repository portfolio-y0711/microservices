import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { FeedEvent } from '@realtime/server/socket.io/vo'
import { IFeedStore } from '@realtime/store'
import Logger from '@config/log'

export const onPutDeleteListener = async (socket: any, context: {
  socketConnector: ISocketConnector,
  amqpConnector: IAmqpConnector,
  feedStore: IFeedStore
}) => {
  const { amqpConnector } = context
  const { PUTDELETE } = FeedEvent

  socket.on(PUTDELETE, async (payload: any) => {
    Logger.debug('[@realtime/socket]: on-cmd-delete')
    Logger.info(`[@realtime/socket]: ${JSON.stringify(payload)}`)

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

}