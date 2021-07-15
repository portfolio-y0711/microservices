import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from 'socket/connection'
import { Socket } from 'socket.io-client'

export interface ISocketFeedService {
  thumbsUp: ({ likerUid, feedUid }: { likerUid: string; feedUid: string }) => void
  thumbsDown: ({ dislikerUid, feedUid }: { dislikerUid: string; feedUid: string }) => void
  post: ({ parentUid, loginUserUid, msg }: { parentUid: string, loginUserUid: string; msg: string }) => void
  addcomment: ({ parentUid, loginUserUid, msg, }: { parentUid: string, loginUserUid: string, msg: string }) => void
  onPostsUpdated: () => Observable<any>
  onFeedUpdated: () => Observable<any>
  onFeedlistUpdated: () => Observable<any>
  delete_: ({ ownerUid, feedUid, parentUid }: { ownerUid: string; feedUid: string; parentUid: string }) => void
  leaveFeedChannel: () => void
  joinFeedChannel: (loginUserUid: string) => void
}

export const SocketFeedService = (connector: ISocketConnector): ISocketFeedService => {
  let socket: Socket

  const joinFeedChannel = async (loginUserUid: string) => {
    if (!socket) {
      socket = await connector.getSocket('feed')
      socket.emit('joinRoom', { loginUserUid })
    }
  }

  const onPostsUpdated = () => {
    return fromEvent(socket, 'postUpdated')
  }

  const onFeedUpdated = () => {
    return fromEvent(socket, 'feedUpdated')
  }

  const onFeedlistUpdated = () => {
    return fromEvent(socket, 'feedlistUpdated')
  }

  const post = async ({ parentUid, loginUserUid, msg }: { parentUid: string, loginUserUid: string; msg: string }) => {
    socket.emit('post', { parentUid, loginUserUid, msg })
  }

  const addcomment = async ({ parentUid, loginUserUid, msg, }: { parentUid: string, loginUserUid: string, msg: string }) => {
    socket.emit('postaddcomment', { parentUid, loginUserUid, msg })
  }

  const thumbsUp = async ({ likerUid, feedUid }: { likerUid: string; feedUid: string }) => {
    socket.emit('putlike', { likerUid, feedUid })
  }

  const thumbsDown = async ({ dislikerUid, feedUid }: { dislikerUid: string; feedUid: string }) => {
    socket.emit('putdislike', { dislikerUid, feedUid })
  }

  const delete_ = async ({ ownerUid, feedUid, parentUid }: { ownerUid: string; feedUid: string; parentUid: string }) => {
    socket.emit('putdelete', { ownerUid, feedUid, parentUid })
  }

  const leaveFeedChannel = async () => {
    socket.disconnect()
    socket = undefined
  }

  return {
    joinFeedChannel,
    leaveFeedChannel,
    post,
    onPostsUpdated,
    onFeedUpdated,
    onFeedlistUpdated,
    addcomment,
    thumbsUp,
    thumbsDown,
    delete_,
  }
}

export default SocketFeedService
