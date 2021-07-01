import { IAmqpConnector } from '@feed/data/amqp/connection'
import { IAmqpOperation } from '@feed/data/amqp/operation'

export const AmqpServer = (() => {
  let amqpConnector: IAmqpConnector
  let amqpOperation: (amqpConnector: IAmqpConnector) => IAmqpOperation

  const injectAmqpConnector = (_amqpConnector: IAmqpConnector) => {
    amqpConnector = _amqpConnector
    return {
      injectAmqpConnector,
      injectAmqpOperation,
      init
    }
  }

  const injectAmqpOperation = (_amqpOperation: (amqpConnector: IAmqpConnector) => IAmqpOperation) => {
    amqpOperation = _amqpOperation
    return {
      injectAmqpConnector,
      injectAmqpOperation,
      init
    }
  }

  const init = () => {
    void amqpOperation(amqpConnector).init()
    return {
      injectAmqpConnector,
      injectAmqpOperation,
      init
    }
  }

  return {
    injectAmqpConnector,
    injectAmqpOperation,
    init
  }
})()