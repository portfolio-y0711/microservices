import { ISocketConnector } from '@realtime/server/socket.io'
import { IChatStore } from '@realtime/server/api'
import { IAmqpConnector } from '@realtime/server/amqp'
import { IFeedStore } from '@realtime/store'
import { IChatSocketListener } from '@realtime/typings'
import { IFeedSocketListener } from '@realtime/typings'

export const SocketServer = (() => {
  let socketConnector: ISocketConnector
  let amqpConnector: IAmqpConnector
  let chatStore: IChatStore
  let feedStore: IFeedStore
  let chatSocketListener: IChatSocketListener
  let feedSocketListeners: IFeedSocketListener[]

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
  const injectChatStore = (_chatStore: IChatStore) => {
    chatStore = _chatStore
    return { ...interfaces }
  }

  const injectFeedSocketListeners = (_feedSocketListeners: IFeedSocketListener[]) => {
    feedSocketListeners = _feedSocketListeners
    return { ...interfaces }
  }

  const injectChatSocketListener = (_chatSocketListener: IChatSocketListener) => {
    chatSocketListener = _chatSocketListener
    return { ...interfaces }
  }

  const init = () => {
    chatSocketListener({
      chatStore,
      amqpConnector,
      socketConnector
    })
    for (const listener of feedSocketListeners) {
      listener({
        socketConnector,
        amqpConnector,
        feedStore
      })
    }
  }
  const interfaces = {
      init,
      injectAmqpConnector,
      injectChatStore,
      injectFeedStore,
      injectSocketConnector,
      injectFeedSocketListeners,
      injectChatSocketListener,
  }
  return { ...interfaces }
})()
