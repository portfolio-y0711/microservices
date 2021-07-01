import { default as config } from '@config/index'
import { default as createServer } from '@gateway/index'

const port = process.env.SERVER_PORT

void (async function() {
    const server = await createServer(config)

    server.listen(port || config.server.port, () => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`\nserver is listening on port ${(server as any).address().port}`)
    })

})()
