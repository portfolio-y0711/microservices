import amqplib, { Connection } from 'amqplib'

// export interface IQueueService {

// }

export interface IQueueConnection {
  connStr: string
  conn: Connection
  getConnection: () => Promise<Connection>
}


export const QueueService = (connection: IQueueConnection) => {
// export const QueueService = (connection: IQueueConnection): IQueueService => {
  const openChannel
    = async (queue: string) => {
      const conn = await connection.getConnection()
      const channel = await conn.createChannel()
      await channel.assertQueue(queue)
      return channel
    }

  // var amqp = require('amqplib');

  // amqp.connect('amqp://localhost').then(function(conn) {
  //   return conn.createChannel().then(function(ch) {
  //     var q = 'hello';
  //     var msg = 'Hello World!';

  //     var ok = ch.assertQueue(q, {durable: false});

  //     return ok.then(function(_qok) {
  //       // NB: `sentToQueue` and `publish` both return a boolean
  //       // indicating whether it's OK to send again straight away, or
  //       // (when `false`) that you should wait for the event `'drain'`
  //       // to fire before writing again. We're just doing the one write,
  //       // so we'll ignore it.
  //       ch.sendToQueue(q, Buffer.from(msg));
  //       console.log(" [x] Sent '%s'", msg);
  //       return ch.close();
  //     });
  //   }).finally(function() { conn.close(); });
  // }).catch(console.warn);

  const pushMessage = (message: Record<string, unknown>) => {
    let channel: amqplib.Channel
    const serialized = JSON.stringify(message)
    channel.sendToQueue('post', Buffer.from(serialized, 'utf-8'))
    return
  }
  return {
    openChannel,
    pushMessage
  }
}

// ('amqp://username:password@localhost')