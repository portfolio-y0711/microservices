import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'
export { FetchRecentPosts } from './fetch-recent-posts'
import LOGGER from '@config/logger/winston'

export const FetchUnreadFeeds = (adaptors: IFeedAdaptors) => {
  LOGGER.debug(`[@api/query-operation] fetch-unread-feeds`)
  return async ({
    loginUserUid,
    batchSize,
  }: {
    loginUserUid: string
    batchSize: number
  }): Promise<Feed[]> => {
    const { user, feed } = adaptors
    const { feeds, feedCursor } = await user.findUserFeedInfo(loginUserUid)

    let unreadFeedsCounter: number
    let delta: number
    
    LOGGER.info(`[@api/query-operation] fetch-unread-feeds`)
    LOGGER.info(`[@api/query-operation] feeds length: ${feeds.length}`)
    LOGGER.info(`[@api/query-operation] feed cursor: ${feedCursor}`)
    LOGGER.info(`[@api/query-operation] batch size: ${batchSize}`)
    LOGGER.info(`[@api/query-operation] unreadFeedsCounter: ${unreadFeedsCounter = feeds.length - feedCursor - batchSize}`)
    
    if ((unreadFeedsCounter = feeds.length - feedCursor - batchSize) > 0) {
      await user.saveUserCursor(loginUserUid, feedCursor + (delta = Math.min(unreadFeedsCounter, 10)));
      return feed.findFeedsByList(feeds.slice(feedCursor + delta, batchSize) as string[])
    } else {
      return feed.findFeedsByList(feeds.slice(feedCursor, batchSize) as string[])
    }
  }
}
