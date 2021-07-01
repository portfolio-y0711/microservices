import { Router } from 'express'
import { IFeedQueryService } from '@feed/services'
import { FeedController } from '@feed/server/api/controllers'
import { FeedRouter } from './router'
export { FeedRouter } from './router'

export const createFeedRouter = () => {
  return (service: IFeedQueryService): Router => {
    const router = Router()
    const feedController = FeedController(service)
    const feedRouter = FeedRouter(feedController)

    router.use(feedRouter)

    return router
  }
}

const router = createFeedRouter()

export default router
