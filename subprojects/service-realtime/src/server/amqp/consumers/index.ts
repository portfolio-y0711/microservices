import { IAmqpConnector } from '@realtime/server/amqp'
import { ISocketConnector } from '@realtime/server/socket.io'
import { IFeedStore } from '@realtime/store'
import { onFeedUpdatedConsumer } from './feed'
import { onPostUpdatedConsumer } from './feed'
import { onFeedlistUpdatedConsumer } from './feed'
import { onUserUpdatedConsumer } from './user'

export interface IAmqpConsumer {
  onFeedUpdated: Promise<void>
  onPostUpdated: Promise<void>
  onFeedlistUpdated: Promise<void>
  onUserUpdated: Promise<void>
}

export const AmqpConsumer = (context: {
    amqpConnector: IAmqpConnector
    socketConnector: ISocketConnector
    feedStore: IFeedStore
  }): IAmqpConsumer => {
  const onFeedUpdated = onFeedUpdatedConsumer(context)
  const onPostUpdated = onPostUpdatedConsumer(context)
  const onFeedlistUpdated = onFeedlistUpdatedConsumer(context)
  const onUserUpdated = onUserUpdatedConsumer(context)

  return {
    onFeedUpdated,
    onPostUpdated,
    onFeedlistUpdated,
    onUserUpdated,
  }
}