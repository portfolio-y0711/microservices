import { IFeedCmdService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../connection'

export const PostFeedListener =
  (
    amqpConnector: IAmqpConnector,
    services: {
      feedCmdService: IFeedCmdService
      userCmdService: IUserCmdService
    },
  ) =>
  async () => {
    const conn = await amqpConnector.getConnection()
    const ch = await conn.createChannel()

    let exchangeName = 'feed'
    await ch.assertExchange(exchangeName, 'direct', {
      durable: false,
      autoDelete: false,
    })
    let routingKey = 'post'
    const queueName = 'post_queue'

    await ch.assertQueue(queueName, {
      exclusive: true,
      durable: false,
      autoDelete: false,
    })

    await ch.bindQueue(queueName, exchangeName, routingKey)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await ch.consume(queueName, async function (message) {
      try {
        if (message) {
          const { loginUserUid, msg } = JSON.parse(message.content.toString())
          const result = await services.feedCmdService.publishPost({
            writerUid: loginUserUid,
            msg,
          })
          ch.ackAll()

          console.log('=================')
          console.log(result)
          exchangeName = 'feed'
          routingKey = 'posted'

          const payload = { loginUserUid, result }
          ch.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(payload)),
            {
              persistent: false,
            },
          )
        }
      } catch (e) {
        console.log(e)
      }
    })
  }
