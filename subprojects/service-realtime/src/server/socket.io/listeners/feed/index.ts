import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { IFeedStore } from '@realtime/store'
import { IFeedSocketListener } from '@realtime/typings'
import { FeedEvent } from '../../vo'
import { onJoinRoomListener } from './impl'
import { onPostListener } from './impl'
import { onThumbsUpListener } from './impl'
import { onThumbsDownListener } from './impl'
import { onPutDeleteListener } from './impl'
import { onAddCommentListener } from './impl'
import LOGGER from '@config/log'

export const FeedSocketListener = (context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) : IFeedSocketListener  => {
  const { socketConnector } = context
  const { CONNECT, DISCONNECT } = FeedEvent

  const SocketIO = socketConnector.getSocket('/feed')

  SocketIO.on(CONNECT, (socket: any) => {

    onJoinRoomListener(socket, context)
    onPostListener(socket, context)
    onThumbsUpListener(socket, context)
    onThumbsDownListener(socket, context)
    onPutDeleteListener(socket, context)
    onAddCommentListener(socket, context)

    socket.on(DISCONNECT, () => {
      console.log('Client disconnected')
    })
  })
  LOGGER.debug(`[@realtime/socket-listener ] listener for 'feed' socket created`)
  return
}

