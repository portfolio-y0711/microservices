import express from 'express'
import { IDBConnection } from '@feed/database'
import { Router } from 'express'
import { default as UserRouter } from './user'
import { default as FeedRouter } from './feed'

export { createFeedRouter } from './feed'
export { createUserRouter } from './user'

export { FeedRouter } from './feed/router'
export { UserRouter } from './user/router'

export default function (conn: IDBConnection): Router {
    const router = Router()
    router
        .get('/api/health', (_: express.Request, res: express.Response) => { res.json({ status: 'up' }) })
        .use('/api', UserRouter(conn))
        .use('/api', FeedRouter(conn))
    return router
}
