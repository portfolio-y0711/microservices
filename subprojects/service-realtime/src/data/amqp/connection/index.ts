import { amqpConfig } from '@config/amqp'
import amqplib, { Connection, Options } from 'amqplib'

export interface IAmqpConnector {
  conn: Connection | undefined
  getConnection: () => Promise<Connection>
}

class AmqpConnector implements IAmqpConnector {
  conn: Connection | undefined
  config: Options.Connect

  constructor(config: Options.Connect) {
    this.config = config
  }

  async getConnection() {
    if (this.conn == undefined) {
      this.conn = await amqplib.connect(amqpConfig)
    }
    return this.conn
  }
}

export const createAmqpConnector = (config: Options.Connect) => {
  return new AmqpConnector(config)
}
