import { default as config } from '@config/index'
import { default as createConnection } from './setup-db'
import { WebServer } from '@gateway/server'
import { default as Router } from '@gateway/routers'
import { Logger } from '@gateway/middlewares'
// import { Cors } from '@gateway/middlewares'
import { ErrorLogger } from '@gateway/middlewares/logger'


void (async function () {
    const port = process.env.SERVER_PORT
    WebServer
        // .injectCors(Cors(config))
        .injectLogger(Logger(config))
        .injectRouter(Router(await createConnection(config)))
        .injectErrorLogger(ErrorLogger(config))
        .init()
        .listen(port || config.server.port , () => {
            console.log(`\nserver is listening on port ${port || config.server.port}`)
        })
})()