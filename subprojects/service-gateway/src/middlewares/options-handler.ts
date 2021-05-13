import express, { RequestHandler } from 'express'

export const OptionsHandler
    = (req: express.Request, res: express.Response, next: express.NextFunction): RequestHandler => {
        const requestMethod = req.header('Access-Control-Request-Method')
        const requestHeader = req.header('Access-Control-Request-Headers')
        const origin = req.header('Origin')
        if (origin !== '') {
            res.setHeader('Access-Control-Allow-Origin', origin)
            res.setHeader('Access-Control-Allow-Credentials', 'true')
        }
        if ((req.method === 'OPTIONS') && (requestMethod === 'GET' || requestMethod === 'POST') && requestHeader === 'content-type') {
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET')
            // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
        }
        if ((req.method === 'OPTIONS') && (requestMethod === 'PUT' || requestMethod === 'PUT,DELETE')) {
            res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE')
            // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
        }
        next()
        return
    }