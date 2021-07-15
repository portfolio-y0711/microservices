import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const FetchFeeds = (adaptors: IFeedAdaptors) => {
  return async ({ writerUid }: { writerUid: string }): Promise<Feed[]> => {
    const { user, feed } = adaptors
    const feedslist = await user.findUserFeedList(writerUid)
    // return feed.findFeedsWithComments(feeds)
    return feed.findFeedsByList(feedslist)
    // return feed.findFeedsWithDescendants(feeds)
  }
}
