import { fromEvent, Observable } from 'rxjs'
import { ISocketConnector } from 'socket/connection'
import { Socket } from 'socket.io-client'

import { AddComment } from './emitters'
import { Join } from './emitters'
import { ThumbsDown } from './emitters'
import { Post } from './emitters'
import { ThumbsUp } from './emitters'
import { Delete_ } from './emitters'
import { Disconnect } from './emitters'

export interface ISocketFeedService {
  thumbsUp: ({ likerUid, feedUid }: { likerUid: string; feedUid: string }) => void
  thumbsDown: ({ dislikerUid, feedUid }: { dislikerUid: string; feedUid: string }) => void
  post: ({ parentUid, loginUserUid, msg }: { parentUid: string, loginUserUid: string; msg: string }) => void
  addcomment: ({ parentUid, loginUserUid, msg, }: { parentUid: string, loginUserUid: string, msg: string }) => void
  onPostsUpdated: () => Observable<any>
  onFeedUpdated: () => Observable<any>
  delete_: ({ ownerUid, feedUid, parentUid }: { ownerUid: string; feedUid: string; parentUid: string }) => void
  disconnect: () => void
  join: (loginUserUid: string) => void
}

export const SocketFeedService = (connector: ISocketConnector): ISocketFeedService => {
  let socket: Socket

  const onPostsUpdated = () => { 
    return fromEvent(socket, 'postUpdated') 
  }
  const onFeedUpdated = () => { 
    return fromEvent(socket, 'feedUpdated') 
  }

  const join = Join(socket, connector)
  const post = Post(socket)
  const addcomment = AddComment(socket)
  const thumbsUp = ThumbsUp(socket)
  const thumbsDown = ThumbsDown(socket)
  const delete_ = Delete_(socket)
  const disconnect = Disconnect(socket)

  return {
    join,
    post,
    onPostsUpdated,
    onFeedUpdated,
    addcomment,
    thumbsUp,
    thumbsDown,
    delete_,
    disconnect,
  }
}

export default SocketFeedService
