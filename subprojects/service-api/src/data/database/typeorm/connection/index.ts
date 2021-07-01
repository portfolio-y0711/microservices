import { Connection, ConnectionOptions, createConnection } from 'typeorm'

export default class TypeormConnector implements IDBConnector {
  config: ConnectionOptions
  createConnection: (config: ConnectionOptions) => Promise<Connection>
  conn: Connection

  constructor(
    conn: Connection,
    createConnection?: () => Promise<Connection>,
    config?: ConnectionOptions,
  ) {
    if (conn !== undefined) {
      this.conn = conn
    } else {
      this.config = config
      this.createConnection = createConnection
    }
  }

  async getConnection(): Promise<Connection> {
    if (this.conn === undefined) {
      this.conn = await this.createConnection(this.config)
    }
    return this.conn
  }
}

export interface IDBConnector {
  getConnection: () => Promise<Connection>
}

export const createTypeormConnector = (
  conn: Connection,
  config?: ConnectionOptions,
): TypeormConnector => {
  if (conn) {
    return new TypeormConnector(conn)
  } else {
    return new TypeormConnector(undefined, createConnection, config)
  }
}
