import { IChatStore } from '@realtime/store'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { ChatCmdEvent } from '../../vo'
import { onMessageListener } from './impl'
import { onJoinChat } from './impl'
import { onDisconnect } from './impl'
import { onLeaveChat } from './impl'
import { IChatSocketListener } from '@realtime/typings'
import LOGGER from '@config/log'
import { ChatEvent } from '@realtime/server/socket.io/vo'

export const ChatSocketListener = (context: {
  socketConnector: ISocketConnector
  chatStore: IChatStore
}): IChatSocketListener => {
  const { socketConnector } = context
  const { CONNECT } = ChatEvent

  const SocketIO = socketConnector.getSocket('/chat')

  SocketIO.on(CONNECT, (socket: any) => {

    onJoinChat(socket, context)
    onLeaveChat(socket, context)
    onMessageListener(SocketIO, socket, context)
    onDisconnect(socket, context)

  })
  LOGGER.debug(`[@realtime/socket-listener ] listener for 'chat' socket created`)
  return
}
