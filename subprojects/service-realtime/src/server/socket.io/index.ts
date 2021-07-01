import { createFeedService } from '@realtime/data/socket.io'
import { createUserService } from '@realtime/data/socket.io'
import { createChatService } from '@realtime/data/socket.io'
import { ISocketConnector } from '@realtime/data/socket.io'
import { IChatStore } from '@realtime/data/api'
import { IAmqpConnector } from '@realtime/data/amqp'

export const SocketServer = (() => {
  let socketConnector: ISocketConnector
  let chatStore: IChatStore
  let amqpConnector: IAmqpConnector

  const injectSocketConnector = (_socketConnector: ISocketConnector) => {
    socketConnector = _socketConnector
    return {
      init,
      injectAmqpConnector,
      injectChatStore,
      injectSocketConnector,
    }
  }
  const injectAmqpConnector = (_amqpConnector: IAmqpConnector) => {
    amqpConnector = _amqpConnector
    return {
      init,
      injectAmqpConnector,
      injectChatStore,
      injectSocketConnector,
    }
  }
  const injectChatStore = (_chatStore: IChatStore) => {
    chatStore = _chatStore
    return {
      init,
      injectAmqpConnector,
      injectChatStore,
      injectSocketConnector,
    }
  }

  const init = () => {
    const chatService = createChatService({ socketConnector, chatStore })
    const feedService = createFeedService({ socketConnector, amqpConnector })
    const userService = createUserService({ socketConnector, amqpConnector })
    chatService.init()
    feedService.init()
    userService.init()
  }
  return {
    init,
    injectChatStore,
    injectAmqpConnector,
    injectSocketConnector,
  }
})()
