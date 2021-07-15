import { IFeedCmdService } from '@feed/services'
import { IFeedQueryService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../../connection'
import LOGGER from '@config/logger/winston'

export const PutThumbsdownConsumer =
  async (
    amqpConnector: IAmqpConnector,
    services: {
      feedCmdService: IFeedCmdService,
      userCmdService: IUserCmdService,
      feedQueryService: IFeedQueryService
    },
  ): Promise<void> => {
    const {
      feedCmdService: {
        thumbsDownFeed
      },
      feedQueryService: {
        readPostWriter,
      }
    } = services

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
      LOGGER.debug(`[@api/amqp-consumer] cmd-put-thumbs-down`)
      const { dislikerUid, feedUid } = JSON.parse(message.content.toString())
      await thumbsDownFeed({ dislikerUid, feedUid })
      ch.ackAll()

      LOGGER.info(`[@api/amqp-consumer] cmd-put-thumbs-down '${dislikerUid as string}' thumbs down '${feedUid as string}'`)

      exchangeName = 'feed'

      const originalPostWriter = await readPostWriter({ feedUid })

      if (originalPostWriter == dislikerUid ) {
        routingKey = 'postUpdated'
      } else {
        routingKey = 'feedUpdated'
      }

      const payload = { loginUserUid: dislikerUid }

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
