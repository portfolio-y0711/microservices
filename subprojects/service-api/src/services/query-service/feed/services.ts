import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedDatabase } from '@feed/data/database'

export const ReadRecentPosts = (feedDB: IFeedDatabase) => {
  return async ({ userUid }: { userUid: string }): Promise<Feed[]> => {
    return await feedDB.fetchRecentPosts({ userUid })
  }
}

export const ReadUnreadFeeds = (feedDB: IFeedDatabase) => {
  return async ({
    loginUserUid,
    batchSize,
  }: {
    loginUserUid: string
    batchSize: number
  }): Promise<Feed[]> => {
    return await feedDB.fetchUnreadFeeds({ loginUserUid, batchSize })
  }
}

export const ReadFeeds = (feedDB: IFeedDatabase) => {
  return async ({ writerUid }: { writerUid: string }): Promise<Feed[]> => {
    return await feedDB.fetchFeeds({ writerUid })
  }
}
