import express, { Application, RequestHandler } from 'express'
import http from 'http'

const cors = require('cors')

export const ApiServer = (() => {
  let app: Application
  let router: RequestHandler
  let server: http.Server

  const injectApp = (_app: Application) => {
    app = _app
    return { injectApp, injectRouter, injectServer, init, getServer }
  }
  const injectRouter = (_router: RequestHandler) => {
    router = _router
    return { injectApp, injectRouter, injectServer, init, getServer }
  }
  const injectServer = (_server: http.Server) => {
    server = _server
    return { injectApp, injectRouter, injectServer, init, getServer }
  }

  const init = () => {
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.options('*', cors())
    app.use('/api', router)

  }
  const getServer = () => {
    return server
  }
  return { injectApp, injectRouter, injectServer, init, getServer }
})()
