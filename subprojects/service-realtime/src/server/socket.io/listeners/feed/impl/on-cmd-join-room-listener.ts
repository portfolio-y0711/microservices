import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'
import { CommonEvent } from '../../../vo'

export const onJoinRoomListener = (socket: any, context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) => {
  const { feedStore } = context
  const { JOINROOM } = CommonEvent

  socket.on(JOINROOM, async ({ loginUserUid }) => {
    LOGGER.debug('[@realtime/socket]: on-cmd-join-feed-room')
    socket.join(loginUserUid)
    LOGGER.info(`[@realtime/socket]: on-cmd-join-feed-room '${loginUserUid}'`)

    if (!feedStore.hasUser(loginUserUid)) {
      feedStore.addUser(loginUserUid, socket.id)
    }
  })
}