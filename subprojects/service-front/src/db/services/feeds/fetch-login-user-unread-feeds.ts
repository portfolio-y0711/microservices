import { IApi } from 'db/api'
import { FeedType, IFeedQueryType } from 'typings'

export const FetchFeeds = (api: IApi) => async (): Promise<FeedType[]> => {
  const { LOGIN_USER_UNREAD_FEEDS } = IFeedQueryType
  return await api.getFeeds(LOGIN_USER_UNREAD_FEEDS)
}
