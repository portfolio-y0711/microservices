import { NextFunction, Request, Response } from 'express'

import { IFeedService } from '@feed/services/feed'
import { AsyncHandler } from '../async.handler'

import { PostFeed } from './controllers'
import { GetFeeds } from './controllers'

export interface IFeedController {
    postFeed: (req: Request, res: Response, next: NextFunction) => void
    getFeeds: (req: Request, res: Response, next: NextFunction) => void

    /*
        putLikeComment: (req: Request, res: Response, next: NextFunction) => void
        putDislikeComment: (req: Request, res: Response, next: NextFunction) => void
        putAddComment: (req: Request, res: Response, next: NextFunction) => void
    */
}


export const FeedController
    = (service: IFeedService): IFeedController => {
        const postFeed = AsyncHandler(PostFeed(service))
        const getFeeds = AsyncHandler(GetFeeds(service))

        /*
            const putLikeComment = AsyncHandler(PutLikeComment(service))
            const putDislikeComment = AsyncHandler(PutDislikeComment(service))
            const putAddComment = AsyncHandler(PutAddComment(service))
        */

        return {
            postFeed,
            getFeeds,

            /*
                putLikeComment,
                putDislikeComment,
                putAddComment,
            */
        }
    }



