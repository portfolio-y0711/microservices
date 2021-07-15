import { IAmqpConnector } from '@realtime/server/amqp/connection'
import { ISocketConnector } from '@realtime/server/socket.io/connection'
import { CommonEvent } from '@realtime/server/socket.io/vo'
import { IFeedStore } from '@realtime/store'
import LOGGER from '@config/log'

export const onJoinRoomListener = (socket: any, context: {
  socketConnector: ISocketConnector
  amqpConnector: IAmqpConnector
  feedStore: IFeedStore
}) => {
  const { feedStore } = context
  const { JOINROOM } = CommonEvent

  socket.on(JOINROOM, async ({ loginUserUid }) => {
    LOGGER.debug('[@realtime/socket-listener]: |user| on-cmd-join-user-room')
    socket.join(loginUserUid)
    if (feedStore.hasUser(loginUserUid)) {
      feedStore.addUser(loginUserUid, socket.id)
    }
    LOGGER.info(`[@realtime/socket-listener]: on-cmd-join-user-room '${loginUserUid}'`)
  })


}