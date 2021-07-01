import { Options } from 'amqplib'

export const amqpConfig: Options.Connect = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  vhost: '/',
}
