import express from 'express'
import http from 'http'

import { chatSocketConfig } from '@config/socket.io'
import { createSocketConnector } from './server/socket.io'

import { amqpConfig } from '@config/amqp'
import { createAmqpConnector } from './server/amqp'

import { createChatStore } from './store'
import { createFeedStore } from './store'

import { SocketServer } from './server/socket.io/server'
import { AmqpServer } from './server/amqp/server'
import { ApiServer } from './server/api/server'
import { chatRouter } from './server/api/routes'
import { HttpServer } from './server/http/index'

import { registryConfig } from '@config/http'
import { createRegistryConnector } from './server/http/register'
import { AmqpConsumer as consumer } from './server/amqp'
import { ChatSocketListener as chatSocketListener } from './server/socket.io'
import { FeedSocketListener as feedSocketListener } from './server/socket.io'
import { UserSocketListener as userSocketListener } from './server/socket.io'

const app = express()
const server = http.createServer(app)
const chatStore = createChatStore(new Map<string, string>(), [])
const feedStore = createFeedStore(new Map<string, string>())
const socketConnector = createSocketConnector(server, chatSocketConfig)
const amqpConnector = createAmqpConnector(amqpConfig)
const router = chatRouter(chatStore)
const registryConnector = createRegistryConnector(registryConfig)

export default (): http.Server => {

  SocketServer
    .injectChatStore(chatStore)
    .injectFeedStore(feedStore)
    .injectAmqpConnector(amqpConnector)
    .injectSocketConnector(socketConnector)
    .injectChatSocketListener(chatSocketListener)
    .injectFeedSocketListeners([
      feedSocketListener,
      userSocketListener
    ])
    .init()

  AmqpServer
    .injectFeedStore(feedStore)
    .injectAmqpConnector(amqpConnector)
    .injectSocketConnector(socketConnector)
    .injectAmqpConsumer(consumer)
    .init()

  ApiServer
    .injectApp(app)
    .injectRouter(router)
    .injectServer(server)
    .init()

  HttpServer
    .injectServer(server)
    .injectRegistryConnector(registryConnector)
    .init()

  return HttpServer.getServer()
}
