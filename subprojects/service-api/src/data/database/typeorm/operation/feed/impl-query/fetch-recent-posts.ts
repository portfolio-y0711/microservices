import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const FetchRecentPosts = (adaptors: IFeedAdaptors) => {
  return async ({ userUid }: { userUid: string }): Promise<Feed[]> => {
    const { user, feed } = adaptors
    const { posts } = await user.findUserFeedInfo(userUid)
    return feed.findFeedsByList(posts)
  }
}
