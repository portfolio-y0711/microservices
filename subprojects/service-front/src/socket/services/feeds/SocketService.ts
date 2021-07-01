import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from 'socket/connection/index'

export interface ISocketFeedService {
  post: ({ loginUserUid, msg }: { loginUserUid: string; msg: string }) => void
  thumbsUp: ({ likerUid, feedUid }: { likerUid: string; feedUid: string }) => void
  thumbsDown: ({ dislikerUid, feedUid }: { dislikerUid: string; feedUid: string }) => void
  onPostSaved: () => Promise<Observable<any>>
  onFeedUpdated: () => Promise<Observable<any>>
  delete_: ({ ownerUid, feedUid }: { ownerUid: string; feedUid: string }) => void
  disconnect: () => void
}

export const SocketFeedService = (connector: ISocketConnector): ISocketFeedService => {
  const onPostSaved = async () => {
    const socket = await connector.getSocket('feed')
    return fromEvent(socket, 'postSaved')
  }

  const post = async ({ loginUserUid, msg }: { loginUserUid: string; msg: string }) => {
    const socket = await connector.getSocket('feed')
    socket.emit('post', { loginUserUid, msg })
  }

  const onFeedUpdated = async () => {
    const socket = await connector.getSocket('feed')
    return fromEvent(socket, 'feedUpdated')
  }

  const thumbsUp = async ({ likerUid, feedUid }: { likerUid: string; feedUid: string }) => {
    const socket = await connector.getSocket('feed')
    socket.emit('putlike', { likerUid, feedUid })
  }

  const thumbsDown = async ({ dislikerUid, feedUid }: { dislikerUid: string; feedUid: string }) => {
    const socket = await connector.getSocket('feed')
    socket.emit('putdislike', { dislikerUid, feedUid })
  }

  const delete_ = async ({ ownerUid, feedUid }: { ownerUid: string; feedUid: string }) => {
    const socket = await connector.getSocket('feed')
    socket.emit('putdelete', { ownerUid, feedUid })
  }

  const disconnect = async () => {
    const socket = await connector.getSocket('feed')
    socket.disconnect()
  }

  return {
    post,
    onPostSaved,
    onFeedUpdated,
    thumbsUp,
    thumbsDown,
    delete_,
    disconnect,
  }
}

export default SocketFeedService
