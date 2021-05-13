import { RequestHandler, Router } from 'express'
import { IFeedController } from '@gateway/controllers/feed'
import { Cors } from '@gateway/middlewares'

export const FeedRouter
    = (controller: IFeedController, authMiddleware: RequestHandler): Router => {

        const router = Router()
        router
            .post('/feeds', Cors, authMiddleware, controller.postFeed) // ▶︎▶︎▶︎ 로그인한 유저명으로 피드 생성
            .get('/feeds', Cors, authMiddleware, controller.getFeeds) // ▶︎▶︎▶︎ 로그인한 유저가 작성한 피드 반환 
        return router
    }

// export const FeedRouter
//     = (controller: IFeedController,
//         authMiddleware: RequestHandler): Router => {

//         const router = Router()
//         router
//             .post('/feeds', authMiddleware, controller.postFeed) // ▶︎▶︎▶︎ 로그인한 유저명으로 피드 생성
//             .get('/feeds', authMiddleware, controller.getFeeds) // ▶︎▶︎▶︎ 로그인한 유저가 작성한 피드 반환 

//         // ⬇︎⬇︎⬇  -----      ︎to be implemented      -----︎ ⬇︎⬇︎⬇

//         /*
//             backlogs:

//             .put('/feed/:feedUid', controller.putLikeComment)
//             .put('/feed/:feedUid', controller.putDislikeComment)
//             .put('/feed/:feedUid', controller.putAddComment)
//         */

//         return router
//     }
