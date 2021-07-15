import { IFeedCmdService } from '@feed/services'
import { IUserQueryService } from '@feed/services'
import { IFeedQueryService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../../connection'
import LOGGER from '@config/logger/winston'

export const PostFeedConsumer = async (
  amqpConnector: IAmqpConnector,
  services: {
    feedCmdService: IFeedCmdService,
    feedQueryService: IFeedQueryService,
    userCmdService: IUserCmdService,
    userQueryService: IUserQueryService,
  },
): Promise<void> => {
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
    const { parentUid, loginUserUid, msg } = JSON.parse(message.content.toString())
    LOGGER.debug(`[@api/amqp-consumer] cmd-post-feed`)

    const {
      feedCmdService: {
        publishPost
      },
      userCmdService: {
        addUserPostToList,
        addUserFeedToList
      },
      userQueryService: {
        fetchUserSubscribers
      }
    } = services

    const postUid = await publishPost({
      parentUid,
      writerUid: loginUserUid,
      msg,
    })

    await addUserPostToList({
      loginUserUid,
      postUid
    })

    LOGGER.info(`[@api/amqp-consumer] cmd-post-feed '|post| ${postUid} 'added to ${parentUid as string}'`)

    ch.ackAll()

    exchangeName = 'feed'
    routingKey = 'postUpdated'

    let payload: { [name: string]: string } = { loginUserUid }
    ch.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      {
        persistent: false,
      },
    )

    routingKey = 'feedlistUpdated'

    const subscribers = await fetchUserSubscribers(loginUserUid)
    
    for (const subscriber of subscribers) {
      payload = { loginUserUid: subscriber }

      await addUserFeedToList({
        subscriberUid: subscriber,
        feedUid: postUid
      })

      ch.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
        {
          persistent: false,
        },
      )
    }
  }
  )
}
