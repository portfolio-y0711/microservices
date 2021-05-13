import { Connection, ConnectionOptions, createConnection } from 'typeorm'

export default class TypeormConnection implements IDBConnection {
    config: ConnectionOptions
    createConnection: (config: ConnectionOptions) => Promise<Connection>
    conn: Connection

    constructor(conn: Connection, createConnection?: () => Promise<Connection>, config?: ConnectionOptions, ) {
        if (conn !== undefined) {
            this.conn = conn
        } else {
            this.config = config
            this.createConnection = createConnection
        }
    }

    async getConnection(): Promise<Connection> {
        
        if (this.conn === undefined)  {
            this.conn = await this.createConnection(this.config)
        }
        return this.conn
    }
}

export interface IDBConnection {
    getConnection: () => Promise<Connection>
}

export const createTypeormConnection = (conn: Connection, config?: ConnectionOptions): TypeormConnection => {
    if (conn) {
        return new TypeormConnection(conn)
    } else {
        return new TypeormConnection(undefined, createConnection, config)
    }
}
