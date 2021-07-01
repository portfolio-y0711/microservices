import cookieParser from 'cookie-parser'
import http from 'http'
import express, { Application, RequestHandler, ErrorRequestHandler } from 'express'


export const ApiServer
    = (() => {
        let app: Application
        let server: http.Server
        let router: RequestHandler
        let handlers: RequestHandler[]
        let logger: RequestHandler
        // let cors: RequestHandler
        let errlogger: ErrorRequestHandler

        const injectApp = (_app: Application) => {
            app = _app
            return {  ... interfaces }
        }

        const init = () => {
            // const app = express()
            // app.use(cors)
            app.use(logger)
            app.use(cookieParser())
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use('/', router)
            app.use(errlogger)
            return app
        }
        const injectServer = (_server: http.Server) => {
            server = _server
            return { ...interfaces }
        }

        // const injectCors 
        //     = (_cors: RequestHandler) => {
        //         cors = _cors
        //         return { ...interfaces }
        //     }

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
        
        const getServer = () => {
            return server
        }

        const interfaces = { init, getServer, injectServer, injectApp, injectRouter, injectHandlers, injectLogger, injectErrorLogger, /* injectCors */}
        return {
            ...interfaces
        }
    })()
