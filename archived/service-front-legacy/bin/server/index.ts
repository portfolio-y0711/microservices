import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import { Cors } from '../middleware'

export default () => {
    const service = express()
    service.use(Cors)
    service.get('/api/health', (_: express.Request, res: express.Response) => { res.json({ status: 'up' }) })
    service.use(express.static(path.join(__dirname, '../../dist')))
    return service
}
