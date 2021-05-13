import { default as config } from '@config/index'
import { WebServer } from '@registry/server'
import { default as Router } from '@registry/routers'
// import { Cors } from '@registry/middlewares'
import { Logger } from '@registry/middlewares'
import { ErrorLogger } from '@registry/middlewares/logger'

const port = process.env.SERVER_PORT

WebServer
    // .injectCors(Cors(config))
    .injectLogger(Logger(config))
    .injectRouter(Router())
    .injectErrorLogger(ErrorLogger(config))
    .init()
    .listen(port || config.server.port, () => {
        console.log(`\nserver is listening on port ${port || config.server.port}`)
    })