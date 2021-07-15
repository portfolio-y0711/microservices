import { IFeedCmdService, IFeedQueryService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../../connection'
import LOGGER from '@config/logger/winston'

export const PostCommentConsumer = async (
  amqpConnector: IAmqpConnector,
  services: {
    feedCmdService: IFeedCmdService,
    feedQueryService: IFeedQueryService,
    userCmdService: IUserCmdService,
  },
): Promise<void> => {
  const conn = await amqpConnector.getConnection()
  const ch = await conn.createChannel()

  let exchangeName = 'feed'
  await ch.assertExchange(exchangeName, 'direct', {
    durable: false,
    autoDelete: false,
  })
  let routingKey = 'postaddcomment'
  const queueName = 'postaddcomment_queue'

  await ch.assertQueue(queueName, {
    exclusive: true,
    durable: false,
    autoDelete: false,
  })

  await ch.bindQueue(queueName, exchangeName, routingKey)

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  await ch.consume(queueName, async function (message) {
    const { parentUid, loginUserUid, msg } = JSON.parse(message.content.toString())
    LOGGER.debug(`[@api/amqp-consumer] cmd-post-comment`)

    const {
      feedCmdService: {
        publishPost,
        addComment
      },
      feedQueryService: {
        readPostWriter
      }
    } = services

    const commentUid = await publishPost({
      parentUid,
      writerUid: loginUserUid,
      msg,
    })

    await addComment({
      feedUid: parentUid,
      commentUid
    })

    ch.ackAll()

    LOGGER.info(`[@api/amqp-consumer] cmd-post-comment '|comment| ${commentUid}' added to '${parentUid as string}'`)

    exchangeName = 'feed'

    const originalPostWriter = await readPostWriter({ feedUid: parentUid })

    if (originalPostWriter == loginUserUid) {
      routingKey = 'postUpdated'
    } else {
      routingKey = 'feedUpdated'
    }

    const payload = { loginUserUid }

    ch.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      {
        persistent: false,
      },
    )
  }
  )
}
