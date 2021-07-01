import { NextFunction, Request, Response } from 'express'

import { IFeedQueryService } from '@feed/services/query-service/feed'
import { AsyncHandler } from '../async.handler'

import { GetFeeds } from './controllers'
// import { PostFeed } from './controllers'
// import { PutFeed } from './controllers'

export interface IFeedController {
  getFeeds: (req: Request, res: Response, next: NextFunction) => void
  // postFeed: (req: Request, res: Response, next: NextFunction) => void
  // putFeed: (req: Request, res: Response, next: NextFunction) => void

  /*
    
    */
}

export const FeedController = (service: IFeedQueryService): IFeedController => {
  const getFeeds = AsyncHandler(GetFeeds(service))
  // const postFeed = AsyncHandler(PostFeed(service))
  // const putFeed = AsyncHandler(PutFeed(service))

  /*
        
        */

  return {
    getFeeds,
    // postFeed,
    // putFeed,

    /*
            
            */
  }
}
