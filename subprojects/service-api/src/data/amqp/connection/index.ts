import amqplib, { Connection, Options } from 'amqplib'
import { amqpConfig } from '../config'

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.conn
  }
}

export const createAmqpConnector = (
  config: Options.Connect,
): IAmqpConnector => {
  return new AmqpConnector(config)
}
