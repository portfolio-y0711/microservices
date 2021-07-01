import { default as config } from '@config/index'

const port = process.env.SERVER_PORT
import createServer from '../src/index'

const server = createServer()

server.listen(port || config.server.port, () => {
  console.log(`\nserver is listening on port ${port || config.server.port}`)
})