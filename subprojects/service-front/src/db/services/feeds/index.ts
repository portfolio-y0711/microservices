import { IApi } from 'db/api'
import { FeedType } from 'typings'

import { FetchFeeds } from './fetch-login-user-unread-feeds'
import { FetchPosts } from './fetch-login-user-recent-posts'
import { FetchSelectedUserPosts } from './fetch-selected-user-posts'

export interface IFeedsService {
  fetchFeeds: () => Promise<FeedType[]>
  fetchPosts: () => Promise<FeedType[]>
  fetchSelectedUserPosts: (userUid: string) => Promise<FeedType[]>
}

const FeedsService = (api: IApi): IFeedsService => {
  const fetchFeeds = FetchFeeds(api)
  const fetchPosts = FetchPosts(api)
  const fetchSelectedUserPosts = FetchSelectedUserPosts(api)

  return {
    fetchFeeds,
    fetchPosts,
    fetchSelectedUserPosts,
  }
}
export default FeedsService
