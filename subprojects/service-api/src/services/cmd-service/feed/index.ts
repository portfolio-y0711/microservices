import { IFeedDatabase } from '@feed/data/database'
import { Feed, IUser } from '@feed/data/database/typeorm/entities'
import { PublishPost } from './services'
import { DeleteFeed } from './services'
import { ThumbsUpFeed } from './services'
import { ThumbsDownFeed } from './services'

export interface IFeedCmdService {
  publishPost: ({
    writerUid,
    msg,
  }: {
    writerUid: string
    msg: string
  }) => Promise<IUser['uuid']>
  thumbsUpFeed: ({
    feedUid,
    likerUid,
  }: {
    feedUid: string
    likerUid: string
  }) => Promise<Feed>
  thumbsDownFeed: ({
    feedUid,
    dislikerUid,
  }: {
    feedUid: string
    dislikerUid: string
  }) => Promise<Feed>
  deleteFeed: ({
    ownerUid,
    feedUid,
  }: { ownerUid: string, feedUid: string }) => Promise<boolean>
}

export const FeedCmdService = (feedDB: IFeedDatabase): IFeedCmdService => {
  const publishPost = PublishPost(feedDB)
  const thumbsUpFeed = ThumbsUpFeed(feedDB)
  const thumbsDownFeed = ThumbsDownFeed(feedDB)
  const deleteFeed = DeleteFeed(feedDB)


  return {
    publishPost,
    thumbsUpFeed,
    thumbsDownFeed,
    deleteFeed,
  }
}

/*
    backlogs:

*/
