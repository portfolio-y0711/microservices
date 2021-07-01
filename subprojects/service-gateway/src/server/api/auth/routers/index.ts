import { IDBConnection } from '@gateway/data/database'
import { Router } from 'express'
import { default as AuthRouter } from './_auth'

export default function (conn: IDBConnection): Router {
    const router = Router()
    router
        .use('/api', AuthRouter(conn))
    return router
}