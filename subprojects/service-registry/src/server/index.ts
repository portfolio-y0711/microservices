import cookieParser from 'cookie-parser'
import express, { RequestHandler } from 'express'
import { ErrorRequestHandler } from 'express'

export const WebServer
    = (() => {
        let router: RequestHandler
        let handlers: RequestHandler[]
        let logger: RequestHandler
        // let cors: RequestHandler
        let errlogger: ErrorRequestHandler

        const init = () => {
            const app = express()
            // app.use(cors)
            app.use(logger)
            app.use(cookieParser())
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            app.use('/', router)
            app.use(errlogger)
            return app
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

        const interfaces = { init, injectRouter, injectHandlers, injectLogger, injectErrorLogger, /* injectCors */}
        return {
            ...interfaces
        }
    })()
