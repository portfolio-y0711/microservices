import { IChatStore } from '@realtime/data/api/store'
import { ISocketConnector } from '@realtime/data/socket.io/connection'
import { ChatEvent } from '../../vo'

export const Init = (context: {
  socketConnector: ISocketConnector
  chatStore: IChatStore
}) => {
  return () => {
    const { socketConnector, chatStore } = context
    const { CONNECT, DISCONNECT, MESSAGE, JOIN, LEAVE, LIST } = ChatEvent

    const SocketIO = socketConnector.getSocket('/chat')

    SocketIO.on(CONNECT, (socket: any) => {
      console.log(socket.id)
      console.log('Connected chat-socket on port')

      socket.on(MESSAGE, (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m))
        console.log(chatStore.getUsers())
        SocketIO.emit('message', m)
      })

      socket.on(JOIN, (userUid: string) => {
        chatStore.addUser(userUid)
        console.log('[server](join): %s', JSON.stringify(userUid))
        console.log(chatStore.getUsers())
        SocketIO.emit('join', userUid)
      })

      socket.on(LIST, () => {
        const users = chatStore.getUsers()
        console.log('[server](list) %s', JSON.stringify(users))
        console.log(chatStore.getUsers())
        SocketIO.emit('join', users)
      })

      socket.on(LEAVE, (userUid: string) => {
        chatStore.removeUser(userUid)
        console.log('[server](leave): %s', JSON.stringify(userUid))
        console.log(chatStore.getUsers())
        SocketIO.emit('leave', userUid)
      })

      socket.on(DISCONNECT, () => {
        socket.connect()
        console.log('Client disconnected')
      })
    })
  }
}

export interface ISocketChatService {
  init: () => void
}

export const createChatService = (context: {
  socketConnector: ISocketConnector
  chatStore: IChatStore
}): ISocketChatService => {
  const init = Init(context)

  return {
    init,
  }
}
