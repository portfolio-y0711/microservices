import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from 'socket/connection'

export interface ISocketUserService {
  onFeedArrived: () => Promise<Observable<any>>
  onUserUpdated: () => Promise<Observable<any>>
  toggleFollow: ({ loginUserUid, userUid }: { loginUserUid: string; userUid: string }) => void
  disconnect: () => void
}

export const SocketUserService = (connector: ISocketConnector): ISocketUserService => {
  const onFeedArrived = async () => {
    const socket = await connector.getSocket('user')
    return fromEvent(socket, 'feedArrived')
  }

  const onUserUpdated = async () => {
    const socket = await connector.getSocket('user')
    return fromEvent(socket, 'userUpdated')
  }

  const toggleFollow = async ({
    loginUserUid,
    userUid,
  }: {
    loginUserUid: string
    userUid: string
  }) => {
    const socket = await connector.getSocket('user')
    socket.emit('toggleFollow', { loginUserUid, userUid })
  }

  const disconnect = async () => {
    const socket = await connector.getSocket('users')
    socket.disconnect()
  }

  return {
    onFeedArrived,
    onUserUpdated,
    toggleFollow,
    disconnect,
  }
}

export default SocketUserService
