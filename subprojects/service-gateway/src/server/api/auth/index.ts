import cookieParser from 'cookie-parser'
import { OptionsHandler } from '@gateway/middlewares/options-handler'
import express, { RequestHandler, Application } from 'express'
import { ErrorRequestHandler } from 'express'
import http from 'http'

export const AuthServer
    = (() => {
        let app: Application
        let server: http.Server
        let router: RequestHandler
        let logger: RequestHandler
        let errlogger: ErrorRequestHandler
        let gracefulShutdown: (server: http.Server) => void

        const init = () => {
            app.options('*', OptionsHandler)
            app.use(logger)
            app.use(cookieParser())
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use('/api', router)
            app.use(errlogger)
            gracefulShutdown(server)

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

        const injectRouter
            = (_router: RequestHandler) => {
                router = _router
                return { ...interfaces }
            }

        const injectGracefulShutdown 
            = (_gracefulShutdown: (server: http.Server) => void) => {
                gracefulShutdown = _gracefulShutdown
                return { ...interfaces }
            }

        const interfaces = { init, injectGracefulShutdown, injectApp, injectServer, injectRouter, injectLogger, injectErrorLogger, /* injectCors */ }
        return {
            ...interfaces
        }
    })()
