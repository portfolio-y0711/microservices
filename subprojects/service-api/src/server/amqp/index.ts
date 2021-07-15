import { IAmqpConnector } from '@feed/data/amqp/connection'
import { IAmqpOperation } from '@feed/data/amqp/operation'

export const AmqpServer = (() => {
  let amqpConnector: IAmqpConnector
  let amqpOperation: (amqpConnector: IAmqpConnector) => IAmqpOperation

  const injectAmqpConnector = (_amqpConnector: IAmqpConnector) => {
    amqpConnector = _amqpConnector
    return { ...interfaces }
  }

  const injectAmqpOperation = (
    _amqpOperation: (amqpConnector: IAmqpConnector) => IAmqpOperation,
  ) => {
    amqpOperation = _amqpOperation
    return { ...interfaces }
  }

  const init = () => {
    amqpOperation(amqpConnector)
    return { ...interfaces }
  }
  const interfaces = {
    injectAmqpConnector,
    injectAmqpOperation,
    init,
  }

  return { ...interfaces }
})()
