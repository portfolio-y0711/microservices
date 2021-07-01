import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const FetchFeeds = (adaptors: IFeedAdaptors) => {
  return async ({ writerUid }: { writerUid: string }): Promise<Feed[]> => {
    const { user, feed } = adaptors
    const feeds = await user.findUserFeedList(writerUid)
    return feed.findFeedsByList(feeds)
  }
}
