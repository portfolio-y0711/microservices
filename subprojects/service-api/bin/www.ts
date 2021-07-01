import axios from 'axios'
import createServer from '../src'
const port = process.env.SERVER_PORT


void (async function () {
  const server = await createServer()

  let res: any
  let counter = 0
  let interval: NodeJS.Timeout

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    interval = setInterval(async function() {
      res = (await axios('http://localhost:15672/api/health/checks/alarms', {
        auth: {
          username: 'guest',
          password: 'guest',
        }
      })).data
      if ((res as { status: string }).status == 'ok' || ++counter > 30) {
        server.listen(parseInt(port) || 0, () => {
          console.log(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `\nserver is listening on port ${(server as any).address().port}`,
          )
        })
        clearInterval(interval)
      }
    }, 1000)
  }, 3000)

})()
