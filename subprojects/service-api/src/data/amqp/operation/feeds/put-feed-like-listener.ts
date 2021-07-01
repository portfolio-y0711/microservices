import { IFeedCmdService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../connection'

export const PutFeedLikeListener =
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
    let routingKey = 'putlike'
    const queueName = 'putlike_queue'

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
          const { likerUid, feedUid } = JSON.parse(message.content.toString())
          await services.feedCmdService.thumbsUpFeed({ likerUid, feedUid })
          ch.ackAll()

          exchangeName = 'feed'
          routingKey = 'putliked'

          const payload = {}
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
