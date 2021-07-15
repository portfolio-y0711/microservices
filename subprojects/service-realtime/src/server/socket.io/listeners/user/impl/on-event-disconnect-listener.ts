import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { UserEvent } from '@realtime/server/socket.io/vo'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'

export const onDisconnect = (socket: any, context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) => {
  const { DISCONNECT } = UserEvent

  socket.on(DISCONNECT, () => {
    LOGGER.debug('[@realtime/socket-listener]: |user| on-cmd-disconnect')
    console.log('Client disconnected')
  })

}