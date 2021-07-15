import { IFeedCmdService, IFeedQueryService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { IAmqpConnector } from '../../../connection'
import LOGGER from '@config/logger/winston'

export const PutThumbsupConsumer =
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
        thumbsUpFeed
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
      LOGGER.debug(`[@api/amqp-consumer] cmd-put-thumbs-up`)
      const { likerUid, feedUid } = JSON.parse(message.content.toString())
      await thumbsUpFeed({ likerUid, feedUid })
      ch.ackAll()

      LOGGER.info(`[@api/amqp-consumer] cmd-put-thumbs-up '${likerUid as string}' thumbs up '${feedUid as string}'`)

      exchangeName = 'feed'
      const originalPostWriter = await readPostWriter({ feedUid })

      if (originalPostWriter == likerUid ) {
        routingKey = 'postUpdated'
      } else {
        routingKey = 'feedUpdated'
      }

      const payload = { loginUserUid: likerUid }
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
