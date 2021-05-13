import { Cors } from '../middlewares'
import { IDBConnection } from '@gateway/database'
import { Router } from 'express'
import { default as UserRouter } from './user'
import { default as FeedRouter } from './feed'
import { default as AuthRouter } from './auth'
import { default as FrontRouter } from './front'

export { createFeedRouter } from './feed'
export { createUserRouter } from './user'
export { createAuthRouter } from './auth'
export { createFrontRouter } from './front'

export { AuthRouter } from './auth/router'
export { FeedRouter } from './feed/router'
export { UserRouter } from './user/router'
export { FrontRouter } from './front/router'

export default function (conn: IDBConnection): Router {
    const router = Router()
    router
        .use('/', FrontRouter())
        .use('/api', AuthRouter(conn))
        .use('/api', UserRouter())
        .use('/api', FeedRouter())
    return router
}