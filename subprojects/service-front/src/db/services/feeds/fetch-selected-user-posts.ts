import { IApi } from 'db/api'
import { FeedType, IFeedQueryType } from 'typings'

export const FetchSelectedUserPosts =
  (api: IApi) =>
  async (userUid: string): Promise<FeedType[]> => {
    const { SELECT_USER_RECENT_POSTS } = IFeedQueryType
    return await api.getFeeds(SELECT_USER_RECENT_POSTS, userUid)
  }
