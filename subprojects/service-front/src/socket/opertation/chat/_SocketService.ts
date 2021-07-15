import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from '../../connection/index'
import { ChatMessage } from 'store/models/chat/model.chat'
import { Join, Leave, Send } from './emitters'
import { Disconnect } from './emitters/index'

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
  const onLeave = async () => {
    const socket = await connector.getSocket(namespace)
    return fromEvent(socket, 'leave')
  }
  const onMessage = async () => {
    const socket = await connector.getSocket(namespace)
    console.log('receiving message')
    return fromEvent(socket, 'message')
  }

  const join = Join(connector, namespace)
  const send = Send(connector, namespace)
  const disconnect = Disconnect(connector, namespace)
  const leave = Leave(connector, namespace)

  return {
    onJoin,
    onLeave,
    send,
    onMessage,
    disconnect,
    join,
    leave,
  }
}

export default SocketChatService
