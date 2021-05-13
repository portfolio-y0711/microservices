import { default as config } from '@config/index'
import { default as createConnection } from './setup-db'
import { WebServer } from '@feed/server'
import { default as Router } from '@feed/routers'
import { Logger } from '@feed/middlewares'
import { ErrorLogger } from '@feed/middlewares/logger'
import http from 'http'
import axios from 'axios'


void (async function () {
    const port = process.env.SERVER_PORT
    const service = WebServer
        .injectLogger(Logger(config))
        .injectRouter(Router(await createConnection(config)))
        .injectErrorLogger(ErrorLogger(config))
        .init()
    const server = http.createServer(service)
    server.listen(0 || port)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server.on('listening', async () => {
        const { registryUrl } = config.projects.development
        const registerService
            = async () => await axios.put(`${registryUrl}/api/registries`, {}, {
                params: {
                    servicename: config.projects.development.name,
                    serviceversion: config.projects.development.version,
                    serviceport: (<any>server).address().port
                }
            })

        const params = new URLSearchParams({
            servicename: config.projects.development.name,
            serviceversion: config.projects.development.version,
            serviceport: (<any>server).address().port
        }).toString()
        
        const unregisterService
            = async () => await axios.delete(`${registryUrl}/api/registries?${params}`)

        await registerService()

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const interval = setInterval(registerService, 5000);

        const cleanup = async () => {
            clearInterval(interval)
            await unregisterService()
        }

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        process.on('uncaughtException', async () => {
            await cleanup()
            process.exit(0)
        })

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        process.on('SIGINT', async () => {
            await cleanup()
            process.exit(0)
        })

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        process.on('SIGTERM', async () => {
            await cleanup()
            process.exit(0)
        })

        // setTimeout(() => {
        //   throw new Error('Something happened');
        // }, 10000)

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`\nserver is listening on port ${(server as any).address().port}`)
    })

})()

// .listen(port || config.server.port , () => {
// })