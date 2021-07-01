import { IApi } from 'db/api'
import { FeedType, IFeedQueryType } from 'typings'

export const FetchPosts = (api: IApi) => async (): Promise<FeedType[]> => {
  const { LOGIN_USER_RECENT_POSTS } = IFeedQueryType
  return await api.getFeeds(LOGIN_USER_RECENT_POSTS)
}
