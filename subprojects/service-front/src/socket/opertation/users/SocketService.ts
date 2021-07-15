import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from 'socket/connection'
import { Socket } from 'socket.io-client'

export interface ISocketUserService {
  onUserUpdated: () => Promise<Observable<any>>
  toggleFollow: ({ loginUserUid, userUid }: { loginUserUid: string; userUid: string }) => void
  leaveUserChannel: () => void
  joinUserChannel: (loginUserUid: string) => void
}

export const SocketUserService = (connector: ISocketConnector): ISocketUserService => {
  let socket: Socket

  const joinUserChannel = async (loginUserUid: string) => {
    if (!socket) {
      socket = await connector.getSocket('user')
      socket.emit('joinRoom', { loginUserUid })
    }
  }


  const onUserUpdated = async () => {
    return fromEvent(socket, 'userUpdated')
  }

  const toggleFollow = async ({
    loginUserUid,
    userUid,
  }: {
    loginUserUid: string
    userUid: string
  }) => {
    socket.emit('toggleFollow', { loginUserUid, userUid })
  }

  const leaveUserChannel = async () => {
    socket.disconnect()
    socket = undefined
  }

  return {
    onUserUpdated,
    toggleFollow,
    leaveUserChannel,
    joinUserChannel,
  }
}

export default SocketUserService
