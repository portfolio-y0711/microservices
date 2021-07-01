import { ISocketConnector } from '@realtime/data/socket.io'
import { IAmqpConnector } from '@realtime/data/amqp'
import { OnPostFeedListener } from '@realtime/data/amqp'
import { OnPutLikedListener } from '@realtime/data/amqp'
import { OnPutDislikedListener } from '@realtime/data/amqp'
import { OnPutUserUpdatedListener } from '@realtime/data/amqp'
import { OnFeedDeletedListener } from '@realtime/data/amqp'

export const AmqpServer = (() => {
  let socketConnector: ISocketConnector
  let amqpConnector: IAmqpConnector

  const injectSocketConnector = (_socketConnector: ISocketConnector) => {
    socketConnector = _socketConnector
    return {
      init,
      injectAmqpConnector,
      injectSocketConnector,
    }
  }

  const injectAmqpConnector = (_amqpConnector: IAmqpConnector) => {
    amqpConnector = _amqpConnector
    return {
      init,
      injectAmqpConnector,
      injectSocketConnector,
    }
  }

  const init = () => {
    OnPostFeedListener({ amqpConnector, socketConnector })()
    OnFeedDeletedListener({ amqpConnector, socketConnector })()
    OnPutLikedListener({ amqpConnector, socketConnector })()
    OnPutDislikedListener({ amqpConnector, socketConnector })()
    OnPutUserUpdatedListener({ amqpConnector, socketConnector })()
  }
  return {
    init,
    injectAmqpConnector,
    injectSocketConnector,
  }
})()
