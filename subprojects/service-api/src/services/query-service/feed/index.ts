import { IFeedDatabase } from '@feed/data/database'
import { Feed } from '@feed/data/database/typeorm/entities'
import { ReadFeeds } from './services'
import { ReadUnreadFeeds } from './services'
import { ReadRecentPosts } from './services'

export interface IFeedQueryService {
  readFeeds: ({ writerUid }: { writerUid: string }) => Promise<Feed[]>
  readUnreadFeeds: ({
    loginUserUid,
    batchSize,
  }: {
    loginUserUid: string
    batchSize: number
  }) => Promise<Feed[]>
  readRecentPosts: ({ userUid }: { userUid: string }) => Promise<Feed[]>
}

export const FeedQueryService = (feedDB: IFeedDatabase): IFeedQueryService => {
  const readFeeds = ReadFeeds(feedDB)
  const readUnreadFeeds = ReadUnreadFeeds(feedDB)
  const readRecentPosts = ReadRecentPosts(feedDB)

  return {
    readFeeds,
    readUnreadFeeds,
    readRecentPosts,
  }
}
