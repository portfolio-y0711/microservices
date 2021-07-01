import { IQueueConnection } from '../index'
import amqplib, { Connection } from 'amqplib'

export default class QueueConnection implements IQueueConnection{
  connStr: string
  conn: Connection

  constructor(connStr: string) {
    this.connStr = connStr
  }

  async getConnection () {
    if (this.conn === undefined) {
      this.conn = await amqplib.connect(this.connStr) 
    }
    return this.conn
  }

}