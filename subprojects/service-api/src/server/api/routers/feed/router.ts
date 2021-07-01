import { Router } from 'express'
import { IFeedController } from '@feed/server/api/controllers'

export const FeedRouter = (controller: IFeedController): Router => {
  const router = Router()
  router.get('/feeds', controller.getFeeds)

  return router
}
