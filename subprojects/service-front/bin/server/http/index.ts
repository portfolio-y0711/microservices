import http from 'http'

export const HttpServer = (() => {
  let server: http.Server
  let listener: (server: http.Server) => Promise<void>

  const injectServer = (_server: http.Server) => {
    server = _server
    return { ...interfaces }
  }

  const injectRegistryConnector = (_listener: (server: http.Server) => Promise<void>) => {
    listener = _listener
    return { ...interfaces }
  }

  const init = () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server.on('listening', async() => listener(server))
  }
  const interfaces = { init, injectServer, injectRegistryConnector }
  return { 
    ...interfaces 
  }
})()
