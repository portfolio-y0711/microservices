import { ISocketConnector } from '@realtime/server/socket.io'
import { IFeedStore } from '@realtime/store'
import { IAmqpConnector } from '@realtime/server/amqp'
import { IAmqpConsumer } from '@realtime/server/amqp'

export const AmqpServer = (() => {
  let socketConnector: ISocketConnector
  let amqpConnector: IAmqpConnector
  let feedStore: IFeedStore
  let listener: (
    context: {
      amqpConnector: IAmqpConnector
      socketConnector: ISocketConnector
      feedStore: IFeedStore
    }
  ) => IAmqpConsumer

  const injectSocketConnector = (_socketConnector: ISocketConnector) => {
    socketConnector = _socketConnector
    return { ...interfaces }
  }

  const injectAmqpConnector = (_amqpConnector: IAmqpConnector) => {
    amqpConnector = _amqpConnector
    return { ...interfaces }
  }

  const injectFeedStore = (_feedStore: IFeedStore) => {
    feedStore = _feedStore
    return { ...interfaces }
  }

  const injectAmqpConsumer = (_listener: (context: {
    amqpConnector: IAmqpConnector
    socketConnector: ISocketConnector
    feedStore: IFeedStore
  }) => IAmqpConsumer) => {
    listener = _listener
    return { ...interfaces }
  }

  const init = () => {
    listener({ amqpConnector, socketConnector, feedStore })
  }

  const interfaces = {
    init,
    injectAmqpConsumer,
    injectSocketConnector,
    injectAmqpConnector,
    injectFeedStore,
  }

  return { ...interfaces }
})()
