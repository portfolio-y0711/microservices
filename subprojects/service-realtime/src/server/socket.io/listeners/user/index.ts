import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { IFeedSocketListener } from '@realtime/typings'
import { IFeedStore } from '@realtime/store'
import { UserEvent } from '../../vo'
import { onToggleFollowListener } from './impl'
import { onJoinRoomListener } from './impl'
import { onDisconnect } from './impl'
import LOGGER from '@config/log'
import { onMessageListener } from '../chat/impl'

export interface IUserSocketListener {}

export const UserSocketListener = (context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) : IFeedSocketListener => {
  const { socketConnector } = context
  const { CONNECT, DISCONNECT } = UserEvent

  const SocketIO = socketConnector.getSocket('/user')

  SocketIO.on(CONNECT, (socket: any) => {

    onJoinRoomListener(socket, context)
    onToggleFollowListener(socket, context)
    onDisconnect(socket, context)

    socket.on(DISCONNECT, () => {
      console.log('Client disconnected')
    })
  })
  LOGGER.debug(`[@realtime/socket-listener ] listener for 'user' socket created`)
  return
}
