import { ChatCmdEvent } from "@realtime/server/socket.io/vo"
import { ChatEvent } from "@realtime/server/socket.io/vo"
import { IChatStore } from '@realtime/store'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import LOGGER from '@config/log'

export const onLeaveChat = (
  socket: any,
  context: {
    socketConnector: ISocketConnector
    chatStore: IChatStore
  }
) => {
  const { LEAVECHAT } = ChatCmdEvent
  const { chatStore } = context

  socket.on(LEAVECHAT, (userUid: string) => {
    chatStore.removeUser(userUid)

    const users = chatStore.getUsers()
    socket
      .to('public')
      .emit(ChatEvent.USERLIST, userUid)

    socket.leave('public')

    LOGGER.info(`[@realtime/socket-emitter  ] cmd-leave-chat '${userUid}' out of ${JSON.stringify(users)}`)
  })

}