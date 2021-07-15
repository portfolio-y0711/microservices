import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedDatabase } from '@feed/data/database'

export const ReadRecentPosts = (feedDB: IFeedDatabase) => {
  return async ({ userUid }: { userUid: string }): Promise<Feed[]> => {
    const posts = await feedDB.fetchRecentPosts({ userUid })
    return posts
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
    const result = await feedDB.fetchUnreadFeeds({ loginUserUid, batchSize: 5 })
    return result
  }
}

export const ReadFeeds = (feedDB: IFeedDatabase) => {
  return async ({ writerUid }: { writerUid: string }): Promise<Feed[]> => {
    const result = await feedDB.fetchFeeds({ writerUid })
    return result
  }
}

export const ReadPostWriter = (feedDB: IFeedDatabase) => {
  return async ({ feedUid }: { feedUid: string }): Promise<string> => {
    const result = await feedDB.fetchOriginalPostWriter(feedUid)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result
  }
}
