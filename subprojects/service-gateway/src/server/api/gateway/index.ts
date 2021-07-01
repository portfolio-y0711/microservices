import cookieParser from 'cookie-parser'
import { OptionsHandler } from '@gateway/middlewares/options-handler'
import express, { RequestHandler, Application } from 'express'
import { ErrorRequestHandler } from 'express'
import http from 'http'

export const GatewayServer
    = (() => {
        let app: Application
        let server: http.Server
        let router: RequestHandler
        let handlers: RequestHandler[]
        let logger: RequestHandler
        let errlogger: ErrorRequestHandler

        const init = () => {
            app.options('*', OptionsHandler)
            app.use(logger)
            app.use(cookieParser())
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use('/', router)
            app.use(errlogger)
            return app
        }
        const injectApp = (_app: Application) => {
            app = _app
            return { ...interfaces }
        }
        const injectServer = (_server: http.Server) => {
            server = _server
            return { ...interfaces }
        }

        const injectLogger
            = (_logger: RequestHandler) => {
                logger = _logger
                return { ...interfaces }
            }

        const injectErrorLogger
            = (_errlogger: ErrorRequestHandler) => {
                errlogger = _errlogger
                return { ...interfaces }
            }

        const injectHandlers
            = (_handlers: RequestHandler[]) => {
                handlers = _handlers
                return { ...interfaces }
            }

        const injectRouter
            = (_router: RequestHandler) => {
                router = _router
                return { ...interfaces }
            }

        const interfaces = { init, injectApp, injectServer, injectRouter, injectHandlers, injectLogger, injectErrorLogger, /* injectCors */ }
        return {
            ...interfaces
        }
    })()
