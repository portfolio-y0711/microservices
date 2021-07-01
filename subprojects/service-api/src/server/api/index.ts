import http from 'http'
import cookieParser from 'cookie-parser'
import express, {
  RequestHandler,
  Application,
} from 'express'
import { ErrorRequestHandler } from 'express'

export const ApiServer = (() => {
  let app: Application
  let server: http.Server
  let router: RequestHandler
  let logger: RequestHandler
  let errlogger: ErrorRequestHandler

  const injectApp = (_app: Application) => {
    app = _app
    return { ...interfaces }
  }

  const injectServer = (_server: http.Server) => {
    server = _server
    return { ...interfaces }
  }

  const injectLogger = (_logger: RequestHandler) => {
    logger = _logger
    return { ...interfaces }
  }

  const injectErrorLogger = (_errlogger: ErrorRequestHandler) => {
    errlogger = _errlogger
    return { ...interfaces }
  }

  const injectRouter = (_router: RequestHandler) => {
    router = _router
    return { ...interfaces }
  }

  const init = () => {
    app.use(logger)
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/', router)
    app.use(errlogger)

    // server.listen(port, () => {
    //   console.log(
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //     `\nserver is listening on port ${(server as any).address().port}`,
    //   )
    // })
  }
  const getServer = () => {
    return server
  }
  const interfaces = {
    injectServer,
    getServer,
    init,
    injectApp,
    injectRouter,
    injectLogger,
    injectErrorLogger /* injectCors */,
  }
  return {
    ...interfaces,
  }
})()
