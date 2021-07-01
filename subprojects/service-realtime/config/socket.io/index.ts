import socketIO from 'socket.io'

export const chatSocketConfig: Partial<socketIO.ServerOptions> = {
    cors: {
      origin: [
        "http://localhost:3333", 
        "http://localhost:8000",
        "http://localhost",
        "http://stage:8000",
        "http://portfolio-y0711.com:8000",
      ],
      methods: ["GET", "POST"]
    },
    pingInterval: 3000,
    pingTimeout: 10000,
}