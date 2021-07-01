import { baseUrl } from '../config/index.json' // <-- need to refactor this
// import { api } from '../../db/api'
import socketIO, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

export interface ISocketConnector {
  socketIO: Socket | undefined
  config: Partial<ManagerOptions & SocketOptions> | undefined
  getSocket: (namespace: string) => Promise<Socket>
  socketStore: Map<string, Socket>
}

export class SocketConnector implements ISocketConnector {
  config: Partial<ManagerOptions & SocketOptions>
  socketIO: Socket | undefined
  socketStore: Map<string, Socket>

  constructor(config: Partial<ManagerOptions & SocketOptions>) {
    this.config = config
    this.socketStore = new Map<string, Socket>()
  }

  async getSocket(namespace: string) {
    // const url = await api.getChatServerURL()
    if (!this.socketStore.has(namespace)) {
      this.socketStore.set(namespace, socketIO(`${baseUrl}/${namespace}`))
    }
    return this.socketStore.get(namespace)
  }
}

export const createSocketConnector = (config: Partial<ManagerOptions & SocketOptions>) => {
  return new SocketConnector(config)
}
