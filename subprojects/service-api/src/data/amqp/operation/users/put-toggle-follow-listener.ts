import { IFeedCmdService, IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../connection'

export const PutUserFollowToggleListener =
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
    let routingKey = 'put_toggle_follow'
    const queueName = 'put_toggle_follow_queue'

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
          const { loginUserUid, userUid } = JSON.parse(
            message.content.toString(),
          )
          await services.userCmdService.toggleFollow({
            loginUserUid,
            friendUid: userUid,
          })
          ch.ackAll()

          exchangeName = 'user'
          routingKey = 'user_updated'

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
