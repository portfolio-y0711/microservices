import http, { Server } from 'http'

export const HttpServer = (() => {
  let server: http.Server
  let listener: (server: http.Server) => Promise<void>

  const injectServer = (_server: http.Server) => {
    server = _server
    return {
      init,
      injectServer,
      injectRegistryConnector
    }
  }

  const injectRegistryConnector = (_listener: (server: http.Server) => Promise<void>) => {
    listener = _listener
    return {
      init,
      injectServer,
      injectRegistryConnector
    }
  }

  const getServer = () => {
    return server
  }

  const init = () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server.on('listening', async() => listener(server))
  }
  return {
    init,
    injectServer,
    getServer,
    injectRegistryConnector
  }
})()
