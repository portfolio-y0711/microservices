import { RequestHandler, Router } from 'express'
import { IFeedController } from '@gateway/server/api/gateway/controllers/feed'
import { Cors } from '@gateway/middlewares'

export const FeedRouter
    = (controller: IFeedController, authMiddleware: RequestHandler): Router => {

        const router = Router()
        router
            .post('/feeds', Cors, authMiddleware, controller.postFeed) // ▶︎▶︎▶︎ 로그인한 유저명으로 피드 생성
            .get('/feeds', Cors, authMiddleware, controller.getFeeds) // ▶︎▶︎▶︎ 로그인한 유저가 작성한 피드 반환 
            .put('/feeds/:feedUid', Cors, authMiddleware, controller.putFeed) // ▶︎▶︎▶︎ 로그인한 유저가 작성한 피드 반환 
        return router
    }
