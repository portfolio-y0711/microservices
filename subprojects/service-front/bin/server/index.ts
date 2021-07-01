import express from 'express'
import http from 'http'
import { StaticWebServer } from './api/index'
import { HttpServer } from './http'
import { createRegistryConnector } from './http/registry'
import { registryConfig } from '../config/index'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const app = express()
  const server = http.createServer(app)
  const registryConnector = createRegistryConnector(registryConfig)

  StaticWebServer
    .injectApp(app)
    .init()
  
  HttpServer
    .injectServer(server)
    .injectRegistryConnector(registryConnector)
    .init()

  return server
}
