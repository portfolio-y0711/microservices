import { ISocketConnector } from 'socket/connection'
import { ChatMessage } from 'store/models/chat/model.chat'

export const Join = (connector: ISocketConnector, namespace: string) => async (userUid: string) => {
  const socket = await connector.getSocket(namespace)
  socket.emit('joinChat', userUid)
}

export const Leave = (connector: ISocketConnector, namespace: string) =>  async (userUid: string) => {
  const socket = await connector.getSocket(namespace)
  socket.emit('leave', userUid)
}

export const Send = (connector: ISocketConnector, namespace: string) =>  async (message: ChatMessage) => {
  const socket = await connector.getSocket(namespace)
  console.log('emitting message: ' + message)
  socket.emit('message', message)
}


export const Disconnect = (connector: ISocketConnector, namespace: string) =>  async () => {
  const socket = await connector.getSocket(namespace)
  socket.disconnect()
}
