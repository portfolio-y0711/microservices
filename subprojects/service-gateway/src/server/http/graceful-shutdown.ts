import TypeormConnection from '@gateway/data/database/typeorm/connection'
import http from 'http'

export const GracefulShutdown
  = (db: TypeormConnection) =>
    (server: http.Server) => {

      const connections = []

      setInterval(() => server.getConnections(
        (err, connections) => {
          if (connections > 0) {
            console.log(`${connections} connections currently open`)
          }
        }
      ), 5000)

      const gracefulShutdown = async () => {
        console.log('Received kill signal, shutting down gracefully')
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const conn = await db.getConnection()
        await conn.close()

        server.close(() => {
          console.log('closed out remaining connections')
          process.exit(0)
        })

        setTimeout(() => {
          console.error('could not close connections in time, forcefully shutting down')
          process.exit(1)
        }, 10000)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        connections.forEach(curr => curr.end())
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setTimeout(() => connections.forEach(curr => curr.destroy()), 5000)
      }

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      process.on('SIGTERM', gracefulShutdown)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      process.on('SIGINT', gracefulShutdown)

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    }