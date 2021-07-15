import { ChatCmdEvent, ChatEvent } from '@realtime/server/socket.io/vo';
import { IChatStore } from '@realtime/store'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import LOGGER from '@config/log'

export const onMessageListener = (
  socketIO: any,
  socket: any,
  context: {
    socketConnector: ISocketConnector
    chatStore: IChatStore
  }
) => {
  // socket.on(ChatEvent.MESSAGE, ({ uuid, msg }: { uuid: string, msg: string[] }) => {
  socket.on(ChatEvent.MESSAGE, (payload: any) => {
    LOGGER.debug('[@realtime/socket-listener] cmd-message')
    const { chatStore } = context
    let message: any

    if (Array.isArray(payload.msg[0])) {
      message = {
        ...payload,
        msg: payload.msg[0].map(x=>x.replace(',', '')).join(' ').trim()
      }
    } else {
      message = {
        ...payload,
        msg: payload.msg[0]
      }
    } 

    chatStore.addMessage(message)

    socketIO
      .to(socket.id)
      .emit(ChatEvent.MESSAGES)

    socket
      .to('public')
      .emit(ChatEvent.MESSAGES)

    LOGGER.info(`[@realtime/socket-listener] cmd-message ${JSON.stringify(message)}`)
  })
}