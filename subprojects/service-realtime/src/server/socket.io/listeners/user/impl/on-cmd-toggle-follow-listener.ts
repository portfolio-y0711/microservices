import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { UserEvent } from '@realtime/server/socket.io/vo'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'

export const onToggleFollowListener = (socket: any, context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) => {
  const { TOGGLEFOLLOW } = UserEvent
  const { amqpConnector } = context

  socket.on(TOGGLEFOLLOW, async (payload: any) => {
    LOGGER.debug('[@realtime/socket-listener]: |user| on-cmd-toggle-follow')
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
}