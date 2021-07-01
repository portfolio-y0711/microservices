import { default as createServer } from './server/index'

const server = createServer()
let port = process.env.SERVER_PORT || 3333

server.listen(port || 0, () => {
  console.log(`\nserver is listening on port ${(server as any).address().port}`)
})
