import { Feed } from '@feed/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/database/typeorm/adaptor'

export { FetchRecentPosts } from './fetch-recent-posts'

export const FetchUnreadFeeds
    = (adaptors: IFeedAdaptors) => {
        return async ({ loginUserUid, batchSize }: { loginUserUid: string, batchSize: number }): Promise<Feed[]> => {
            const { user, feed } = adaptors
            const { feeds, feedCursor } = await user.findUserFeedInfo(loginUserUid)

            let _feedlist: string[]
            if (feeds.length >= feedCursor + batchSize) {
                _feedlist = feeds.slice(feedCursor, feedCursor + batchSize)
                await user.saveUserCursor(loginUserUid, feedCursor + batchSize)
            } else {
                _feedlist = feeds
                await user.saveUserCursor(loginUserUid, feeds.length)
            }
            const result = feed.findFeedsByList(_feedlist)
            return result
        }
    }
