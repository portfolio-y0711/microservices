import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../async.handler'

import { PostFeed } from './controllers'
import { GetFeeds } from './controllers'
import { PutFeed } from './controllers'

import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'

export interface IFeedController {
    getFeeds: (req: Request, res: Response, next: NextFunction) => void
    postFeed: (req: Request, res: Response, next: NextFunction) => void
    putFeed: (req: Request, res: Response, next: NextFunction) => void
}

export const FeedController
    = ({ circuitBreaker, serviceFinder }: { circuitBreaker: ICircuitBreaker, serviceFinder: IServiceFinder }): IFeedController => {
        const getFeeds = AsyncHandler(GetFeeds({ circuitBreaker, serviceFinder }))
        const postFeed = AsyncHandler(PostFeed({ circuitBreaker, serviceFinder }))
        const putFeed = AsyncHandler(PutFeed({ circuitBreaker, serviceFinder }))
        return {
            getFeeds,
            postFeed,
            putFeed,
        }
    }
