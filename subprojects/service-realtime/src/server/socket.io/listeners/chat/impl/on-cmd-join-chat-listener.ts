import { ChatCmdEvent, ChatEvent } from '@realtime/server/socket.io/vo';
import { IChatStore } from '@realtime/store'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import LOGGER from '@config/log'
import { Socket } from "socket.io"

export const onJoinChat = (
  socket: Socket,
  context: {
    socketConnector: ISocketConnector
    chatStore: IChatStore
  }
) => {
  const { JOINCHAT } = ChatCmdEvent
  const { chatStore } = context 

  socket.on(JOINCHAT, (userUid: string) => {
    chatStore.addUser(userUid, socket.id)
    // const socketIds = chatStore.getSocketIds()
    const users = chatStore.getUsers()
    socket.join('public')

    socket
      .to('public')
      .emit(ChatEvent.USERLIST, users)

    LOGGER.info(`[@realtime/socket-emitter  ] cmd-join-chat '${userUid}' into ${JSON.stringify(users)}`)
  })
}