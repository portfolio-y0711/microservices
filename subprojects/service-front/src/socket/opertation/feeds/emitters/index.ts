import { Socket } from 'socket.io-client'
import { ISocketConnector } from 'socket/connection'

export const Post = (socket: Socket) => async ({ parentUid, loginUserUid, msg }: { parentUid: string, loginUserUid: string; msg: string }) => {
  socket.emit('post', { parentUid, loginUserUid, msg })
}

export const AddComment = (socket: Socket) => async ({ parentUid, loginUserUid, msg, }: { parentUid: string, loginUserUid: string, msg: string }) => {
  socket.emit('postaddcomment', { parentUid, loginUserUid, msg })
}

export const ThumbsUp = (socket: Socket) => async ({ likerUid, feedUid }: { likerUid: string; feedUid: string }) => {
  socket.emit('putlike', { likerUid, feedUid })
}

export const ThumbsDown = (socket: Socket) => async ({ dislikerUid, feedUid }: { dislikerUid: string; feedUid: string }) => {
  socket.emit('putdislike', { dislikerUid, feedUid })
}

export const Delete_ = (socket: Socket) => async ({ ownerUid, feedUid, parentUid }: { ownerUid: string; feedUid: string; parentUid: string }) => {
  socket.emit('putdelete', { ownerUid, feedUid, parentUid })
}

export const Join = (socket: Socket, connector: ISocketConnector) => async (loginUserUid: string) => {
  if (!socket) {
    socket = await connector.getSocket('feed')
    socket.emit('joinRoom', { loginUserUid })
  }
}

export const Disconnect = (socket: Socket) => async () => {
  socket.disconnect()
  socket = undefined
}