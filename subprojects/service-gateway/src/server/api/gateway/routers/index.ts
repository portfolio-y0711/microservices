import { IDBConnection } from '@gateway/data/database'
import { Router } from 'express'
import { default as UserRouter } from './user'
import { default as FeedRouter } from './feed'
import { default as FrontRouter } from './front'
import { default as ChatRouter } from './chat'

export { createFeedRouter } from './feed'
export { createUserRouter } from './user'
// export { createAuthRouter } from '../auth/_auth'
export { createFrontRouter } from './front'

export { FeedRouter } from './feed/router'
export { UserRouter } from './user/router'
export { FrontRouter } from './front/router'

export default function (_: IDBConnection): Router {
    const router = Router()
    router
        .use('/', FrontRouter())
        .use('/api', UserRouter())
        .use('/api', FeedRouter())
        .use('/api', ChatRouter())
    return router
}