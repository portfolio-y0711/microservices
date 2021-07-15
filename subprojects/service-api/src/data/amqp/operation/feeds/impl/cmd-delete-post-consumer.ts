import { IFeedCmdService, IFeedQueryService, IUserQueryService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../../connection'
import LOGGER from '@config/logger/winston'

export const DeletePostConsumer = async(
    amqpConnector: IAmqpConnector,
    services: {
      feedCmdService: IFeedCmdService,
      feedQueryService: IFeedQueryService,
      userCmdService: IUserCmdService,
      userQueryService: IUserQueryService,
    },
  ) : Promise<void> => {
      const conn = await amqpConnector.getConnection()
      const ch = await conn.createChannel()

      let exchangeName = 'feed'
      await ch.assertExchange(exchangeName, 'direct', {
        durable: false,
        autoDelete: false,
      })
      let routingKey = 'putdelete'
      const queueName = 'putdelete_queue'

      await ch.assertQueue(queueName, {
        exclusive: true,
        durable: false,
        autoDelete: false,
      })

      await ch.bindQueue(queueName, exchangeName, routingKey)

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await ch.consume(queueName, async function (message) {
        const { ownerUid, feedUid, parentUid } = JSON.parse(message.content.toString())
        LOGGER.debug(`[@api/amqp-consumer] cmd-delete-post`)
        const {
          userCmdService: {
            removePostFromList,
            removeFeedFromList,
          },
          feedCmdService: {
            deleteFeed,
            deleteComment
          },
          userQueryService: {
            fetchUserSubscribers
          },
          feedQueryService: {
            readPostWriter
          }
        } = services

        const originalPostWriter = await readPostWriter({ feedUid })

        if (parentUid == "0") {
          await removePostFromList({ loginUserUid: ownerUid, postUid: feedUid })
          const subscribers = await fetchUserSubscribers(ownerUid)

          for (const subscriber of subscribers) {
            await removeFeedFromList({ subscriberUid: subscriber, feedUid })
            LOGGER.info(`[@api/amqp-consumer] cmd-delete-post '${feedUid as string}' removed from '|subscriber| ${subscriber}'`)
          }
          await deleteFeed({ feedUid })

          LOGGER.info(`[@api/amqp-consumer] cmd-delete-post '|post| ${feedUid as string}' deleted `)
        } else {
          await deleteComment({ feedUid })
          LOGGER.info(`[@api/amqp-consumer] cmd-delete-post '|comment| ${feedUid as string}' deleted `)
        }

        ch.ackAll()

        exchangeName = 'feed'

        if (originalPostWriter == ownerUid) {
          routingKey = 'postUpdated'
        } else {
          routingKey = 'feedUpdated'
        }

        const payload = { loginUserUid: ownerUid }

        ch.publish(
          exchangeName,
          routingKey,
          Buffer.from(JSON.stringify(payload)),
          {
            persistent: false,
          },
        )
      })
    }
