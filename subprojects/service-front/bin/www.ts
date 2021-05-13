import http from 'http'
import axios from 'axios'
import { default as projects } from './config'
import { default as createApp } from './server'

const app = createApp()
const port = process.env.SERVER_PORT || 3333

const server = http.createServer(app)
server.listen(0 || port)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
server.on('listening', async () => {
    const { registryUrl } = projects.development

    const registerService
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        = async () => await axios.put(`${registryUrl}/api/registries`, {}, {
            params: {
                servicename: projects.development.name,
                serviceversion: projects.development.version,
                serviceport: (<any>server).address().port
            }
        })

    const params = new URLSearchParams({
        servicename: projects.development.name,
        serviceversion: projects.development.version,
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
