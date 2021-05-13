import { Feed } from '@feed/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/database/typeorm/adaptor'

export const FetchRecentPosts
    = (adaptors: IFeedAdaptors) => {
        return async ({ userUid }:{ userUid: string }): Promise<Feed[]> => {
            const { user, feed } = adaptors
            const { posts } = await user.findUserFeedInfo(userUid)
            return feed.findFeedsByList(posts)
        }
    }
