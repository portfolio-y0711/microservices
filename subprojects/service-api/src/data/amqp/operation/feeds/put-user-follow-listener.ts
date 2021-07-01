import { IFeedCmdService, IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../connection'

export const PutUserFollowListener =
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

    let exchangeName = 'user'
    await ch.assertExchange(exchangeName, 'direct', {
      durable: false,
      autoDelete: false,
    })
    let routingKey = 'putfollow'
    const queueName = 'putfollow_queue'

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
          console.log(message.content.toString())
          const { loginUserUid, userUid } = JSON.parse(
            message.content.toString(),
          )
          await services.userCmdService.followFriend({
            loginUserUid,
            friendUid: userUid,
          })
          ch.ackAll()

          exchangeName = 'user'
          routingKey = 'putfollowed'

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
