import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from '../../connection/index'
import { ChatMessage } from 'store/models/chat/model.chat'
import { Socket } from 'socket.io-client'

export interface ISocketChatService {
  joinChatChannel: () => void
  onMessages: () => Promise<Observable<any>>
  send: (message: ChatMessage) => void
  onUserList: () => Promise<Observable<any>>
  joinChat: (userUid: string) => void
  leave: (userUid: string) => void
  disconnect: () => void
}

export enum ChatCmdEvent {
  MESSAGE = 'message',
  JOINCHAT = 'joinChat',
  LEAVECHAT = 'leave',
}

export enum ChatEvent {
  MESSAGE = 'message',
  MESSAGES = 'messages',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  USERLIST = 'userlist',
}

export const SocketChatService = (connector: ISocketConnector): ISocketChatService => {
  // const namespace = 'chat'
  let socket: Socket

  const joinChatChannel = async () => {
    if (!socket) {
      socket = await connector.getSocket('chat')
    }
  }

  const joinChat = async (userUid: string) => {
    socket.emit(ChatCmdEvent.JOINCHAT, userUid)
  }

  const onUserList = async() => {
    return fromEvent(socket, ChatEvent.USERLIST)
  }

  const onMessages = async () => {
    return fromEvent(socket, ChatEvent.MESSAGES)
  }

  const leave = async (userUid: string) => {
    socket.emit('leave', userUid)
  }

  const send = async (message: ChatMessage) => {
    socket.emit(ChatCmdEvent.MESSAGE, message)
  }

  const disconnect = async () => {
    socket.disconnect()
  }

  return {
    onUserList,
    joinChatChannel,
    send,
    onMessages,
    disconnect,
    joinChat,
    leave,
  }
}

export default SocketChatService
