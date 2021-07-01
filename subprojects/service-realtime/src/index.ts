import express from 'express'
import http from 'http'

import { chatSocketConfig } from '@config/socket.io'
import { createSocketConnector } from './data/socket.io'

import { amqpConfig } from '@config/amqp'
import { createAmqpConnector } from './data/amqp'

import { createChatStore } from './data/api'

import { SocketServer } from './server/socket.io'
import { AmqpServer } from './server/amqp'
import { ApiServer } from './server/api'
import { chatRouter } from './server/api/routes'
import { HttpServer } from './server/http/index'

import { registryConfig } from '@config/http'
import { createRegistryConnector } from './server/http/register'

const app = express()
const server = http.createServer(app)
const chatStore = createChatStore(new Set())
const socketConnector = createSocketConnector(server, chatSocketConfig)
const amqpConnector = createAmqpConnector(amqpConfig)
const router = chatRouter(chatStore)
const registryConnector = createRegistryConnector(registryConfig)

export default (): http.Server => {
  SocketServer.injectAmqpConnector(amqpConnector)
    .injectChatStore(chatStore)
    .injectSocketConnector(socketConnector)
    .init()

  AmqpServer.injectAmqpConnector(amqpConnector)
    .injectSocketConnector(socketConnector)
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
