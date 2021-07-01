import http from 'http'
import axios from 'axios'
import { IRegistryConfig } from '@config/http'

export const createRegistryConnector = (registryConfig: IRegistryConfig) => async(server: http.Server) => {
  const { development: {
    name,
    registryUrl,
    serviceTimeout,
    version
  }} = registryConfig

  const registerService
    = async () =>
      await axios.put(
        `${registryUrl}/api/registries`,
        {},
        {
          params: {
            servicename: name,
            serviceversion: version,
            serviceport: (<any>server).address().port,
          },
        },
      )

  const params = new URLSearchParams({
    servicename: name,
    serviceversion: version,
    serviceport: (<any>server).address().port,
  }).toString()

  const unregisterService = async () =>
    await axios.delete(`${registryUrl}/api/registries?${params}`)

  await registerService()

  const interval = setInterval(registerService, 5000)

  const cleanup = async () => {
    clearInterval(interval)
    await unregisterService()
  }

  process.on('uncaughtException', async () => {
    console.log('error')
    await cleanup()
    process.exit(0)
  })

  process.on('SIGINT', async () => {
    console.log('sigint')
    await cleanup()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    console.log('sigterm')
    await cleanup()
    process.exit(0)
  })

  // setTimeout(() => {
  //   throw new Error('Something happened');
  // }, 10000)

  console.log(`\nserver is listening on port ${(server as any).address().port}`)
}