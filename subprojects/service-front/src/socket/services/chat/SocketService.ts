import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from '../../connection/index'
import { ChatMessage } from 'store/models/chat/model.chat'

export interface ISocketChatService {
  onMessage: () => Promise<Observable<any>>
  send: (message: ChatMessage) => void
  onJoin: () => Promise<Observable<any>>
  join: (userUid: string) => void
  onLeave: () => Promise<Observable<any>>
  leave: (userUid: string) => void
  disconnect: () => void
}

export const SocketChatService = (connector: ISocketConnector): ISocketChatService => {
  const namespace = 'chat'
  const onJoin = async () => {
    const socket = await connector.getSocket(namespace)
    return fromEvent(socket, 'join')
  }

  const join = async (userUid: string) => {
    const socket = await connector.getSocket(namespace)
    socket.emit('join', userUid)
  }

  const onLeave = async () => {
    const socket = await connector.getSocket(namespace)
    return fromEvent(socket, 'leave')
  }

  const leave = async (userUid: string) => {
    const socket = await connector.getSocket(namespace)
    socket.emit('leave', userUid)
  }

  const send = async (message: ChatMessage) => {
    const socket = await connector.getSocket(namespace)
    console.log('emitting message: ' + message)
    socket.emit('message', message)
  }

  const onMessage = async () => {
    const socket = await connector.getSocket(namespace)
    console.log('receiving message')
    return fromEvent(socket, 'message')
  }

  const disconnect = async () => {
    const socket = await connector.getSocket(namespace)
    socket.disconnect()
  }

  return {
    send,
    onMessage,
    disconnect,
    join,
    onJoin,
    leave,
    onLeave,
  }
}

export default SocketChatService
