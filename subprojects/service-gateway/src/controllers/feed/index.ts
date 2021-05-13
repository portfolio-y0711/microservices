import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../async.handler'

import { PostFeed } from './controllers'
import { GetFeeds } from './get-feeds-controller'
import { ICircuitBreaker } from '@gateway/services/circuit'
import { IServiceFinder } from '@gateway/services/finder'

export interface IFeedController {
    getFeeds: (req: Request, res: Response, next: NextFunction) => void
    postFeed: (req: Request, res: Response, next: NextFunction) => void
}

export const FeedController
    = ({ circuitBreaker, serviceFinder }: { circuitBreaker: ICircuitBreaker, serviceFinder: IServiceFinder }): IFeedController => {
        const getFeeds = AsyncHandler(GetFeeds({ circuitBreaker, serviceFinder }))
        const postFeed = AsyncHandler(PostFeed({ circuitBreaker, serviceFinder }))
        return {
            getFeeds,
            postFeed
        }
    }
