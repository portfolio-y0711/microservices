import { IConfig } from '@config/index'
import { AuthServer } from '@gateway/server/api/auth'
import { GatewayServer } from '@gateway/server/api/gateway'
import { default as GatewayRouter } from '@gateway/server/api/gateway/routers'
import { default as AuthRouter } from '@gateway/server/api/auth/routers/_auth'
import { Logger } from '@gateway/middlewares'
import { ErrorLogger } from '@gateway/middlewares/logger'
import http from 'http'
import express from 'express'
import { default as createConnection } from '@config/data/setup-db'
import { GracefulShutdown } from '@gateway/server/http/graceful-shutdown'

export default async (config: IConfig): Promise<http.Server> => {
    const app = express()
    const db = await createConnection(config)
    const server = http.createServer(app)
    const gracefulShutdown = GracefulShutdown(db)

    AuthServer
        .injectApp(app)
        .injectServer(server)
        .injectLogger(Logger(config))
        .injectRouter(AuthRouter(db))
        .injectErrorLogger(ErrorLogger(config))
        .injectGracefulShutdown(gracefulShutdown)
        .init()

    GatewayServer
        .injectApp(app)
        .injectServer(server)
        .injectLogger(Logger(config))
        .injectRouter(GatewayRouter(db))
        .injectErrorLogger(ErrorLogger(config))
        .init()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return server
}
