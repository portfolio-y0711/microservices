import { Router } from 'express'
import { IDBConnection } from '@feed/database'
import { FeedDatabase } from '@feed/database'
import { FeedService } from '@feed/services'
import { FeedController } from '@feed/controllers'
import { FeedRouter } from './router'
export { FeedRouter } from './router'

export const createFeedRouter
    = () => {
        return (conn: IDBConnection): Router => {

            const router = Router()
            const feedDatabase = FeedDatabase(conn)
            const feedService = FeedService(feedDatabase)
            const feedController = FeedController(feedService)
            const feedRouter = FeedRouter(feedController)

            router.use(feedRouter)

            return router
        }
    }

const router = createFeedRouter()

export default router

