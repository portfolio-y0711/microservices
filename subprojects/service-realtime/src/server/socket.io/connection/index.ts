import { Server, ServerOptions, Socket } from 'socket.io'
import http from 'http'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import LOGGER from '@config/log'

export interface ISocketConnector {
  socketIO: any
  server: http.Server
  config: Partial<ServerOptions>
  getSocket: (
    namespace: string,
  ) => Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
}

class SocketConnector implements ISocketConnector {
  socketIO: any
  server: http.Server
  config: Partial<ServerOptions>

  constructor(server: http.Server, config: Partial<ServerOptions>) {
    this.server = server
    this.config = config
  }

  getSocket(namespace?: string) {
    if (this.socketIO == undefined) {
      this.socketIO = new Server(this.server, this.config)
    }
    if (namespace !== undefined) {
      LOGGER.debug(`[@realtime/socket-connector] namespace '${namespace}' has been created`)
      return this.socketIO.of(namespace)
    } else {
      return this.socketIO
    }
  }
}

export const createSocketConnector = (
  server: http.Server,
  config: Partial<ServerOptions>,
) => {
  return new SocketConnector(server, config)
}
