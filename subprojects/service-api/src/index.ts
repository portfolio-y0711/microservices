import express from 'express'
import http from 'http'
import { AmqpServer } from './server/amqp'
import { ApiServer } from './server/api'
import { default as config } from '@config/index'
import { default as createConnection } from '@config/data/setup-db.dev'
import { amqpConfig } from './data/amqp/config'
import { createLoggers } from './factory'
import { createAmqpConnector } from './data/amqp/connection'
import { createFeedService } from './factory.service'
import { createUserService } from './factory.service'
import { AmqpOperation } from './data/amqp/operation'
import { default as Router } from '@feed/server/api/routers'
import { HttpServer } from './server/http'
import { createRegistryConnector } from './server/http/register'
import { default as registryConfig } from '@config/registry'

export default async () => {
  const app = express()
  const server = http.createServer(app)
  const dbConnector = await createConnection(config)
  const registryConnector = createRegistryConnector(registryConfig)

  const [feedQueryService, feedCmdService] = createFeedService(dbConnector)
  const [userQueryService, userCmdService] = createUserService(dbConnector)
  const [logger, errLogger] = createLoggers(config)

  ApiServer.injectApp(app)
    .injectLogger(logger)
    .injectErrorLogger(errLogger)
    .injectRouter(
      Router({ userService: userQueryService, feedService: feedQueryService }),
    )
    .injectServer(server)
    .init()

  AmqpServer.injectAmqpConnector(createAmqpConnector(amqpConfig))
    .injectAmqpOperation(AmqpOperation({
      feedCmdService, 
      feedQueryService,
      userCmdService,
      userQueryService,
    }))
    .init()

  HttpServer.injectServer(server)
    .injectRegistryConnector(registryConnector)
    .init()

  return server
}
