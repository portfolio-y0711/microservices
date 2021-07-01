import { IFeedCmdService, IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../connection'

export const PutFeedDislikeListener =
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
    let routingKey = 'putdislike'
    const queueName = 'putdislike_queue'

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
          const { dislikerUid, feedUid } = JSON.parse(
            message.content.toString(),
          )
          await services.feedCmdService.thumbsDownFeed({
            dislikerUid,
            feedUid,
          })
          ch.ackAll()

          exchangeName = 'feed'
          routingKey = 'putdisliked'

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
