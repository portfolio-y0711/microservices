import axios, { AxiosPromise } from 'axios'
const port = process.env.SERVER_PORT
import createServer from '../src/index'
const server = createServer()

void (async() => {
  let res: any
  let counter: number = 0
  let interval: NodeJS.Timeout

  setTimeout(() => {
    interval = setInterval(async function() {
      res = (await axios('http://localhost:15672/api/health/checks/alarms', {
        auth: {
          username: 'guest',
          password: 'guest',
        }
      })).data
      if ((res as { status: string }).status == 'ok' || ++counter > 30) {
        server.listen(parseInt(port) || 3000)
        clearInterval(interval)
      }
    }, 1000)
  }, 3000)
})()

