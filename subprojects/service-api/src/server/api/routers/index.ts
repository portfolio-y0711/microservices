import express from 'express'
// import { IDBConnector } from '@feed/database'
import { Router } from 'express'
import { default as UserRouter } from './user'
import { default as FeedRouter } from './feed'
import { IFeedQueryService } from '@feed/services'
import { IUserQueryService } from '@feed/services'

export { createFeedRouter } from './feed'
export { createUserRouter } from './user'

export { FeedRouter } from './feed/router'
export { UserRouter } from './user/router'

export interface IQueryServices {
  userService: IUserQueryService
  feedService: IFeedQueryService
}
export default function (queryServices: IQueryServices): Router {
  const router = Router()
  router
    .get('/api/health', (_: express.Request, res: express.Response) => {
      res.json({ status: 'up' })
    })
    .use('/api', UserRouter(queryServices.userService))
    .use('/api', FeedRouter(queryServices.feedService))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return router
}
