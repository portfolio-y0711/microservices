import { ChatEvent } from "@realtime/server/socket.io/vo"
import { IChatStore } from '@realtime/store'
import { ISocketConnector } from '@realtime/server/socket.io/connection'

export const onDisconnect = (
  socket: any,
  context: {
    socketConnector: ISocketConnector
    chatStore: IChatStore
  }
) => {
  const { DISCONNECT } = ChatEvent
  socket.on(DISCONNECT, () => {
    socket.connect()
    console.log('Client disconnected')
  })
}