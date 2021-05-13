import express, { RequestHandler } from 'express'


export const Cors
= (req: express.Request, res: express.Response, next: express.NextFunction): RequestHandler => {
        // const whitelist = ['http://localhost:xxxx', 'http://localhost:yyyy']
        const origin = req.header('Origin')
        if (origin !== '' && origin !== undefined) {
            res.setHeader('Access-Control-Allow-Origin', origin)
            res.setHeader('Access-Control-Allow-Credentials', 'true')
        }
        next()
        return
    }
