import http from 'http'
import express from 'express'
import { ApiServer } from './server/api'
import { default as config } from '@config/index'
import { default as Router } from '@registry/routers'
// import { Cors } from '@registry/middlewares'
import { Logger } from '@registry/middlewares'
import { ErrorLogger } from '@registry/middlewares/logger'

export default (): http.Server => {
  const app = express()
  const server = http.createServer(app)

  ApiServer
    .injectApp(app)
    .injectServer(server)
    // .injectCors(Cors(config))
    .injectLogger(Logger(config))
    .injectRouter(Router())
    .injectErrorLogger(ErrorLogger(config))
    .init()

  return ApiServer.getServer()
}