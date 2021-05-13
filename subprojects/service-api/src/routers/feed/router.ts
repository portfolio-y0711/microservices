import { Router } from 'express'
import { IFeedController } from '@feed/controllers'

export const FeedRouter
    = (controller: IFeedController): Router => {

        const router = Router()
        router
            .get('/feeds', controller.getFeeds) // ▶︎▶︎▶︎ 로그인한 유저가 작성한 피드 반환 
            .post('/feeds', controller.postFeed) // ▶︎▶︎▶︎ 로그인한 유저명으로 피드 생성

        // ⬇︎⬇︎⬇  -----      ︎to be implemented      -----︎ ⬇︎⬇︎⬇

        /*
            backlogs:

            .put('/feed/:feedUid', controller.putLikeComment)
            .put('/feed/:feedUid', controller.putDislikeComment)
            .put('/feed/:feedUid', controller.putAddComment)
        */

        return router
    }
