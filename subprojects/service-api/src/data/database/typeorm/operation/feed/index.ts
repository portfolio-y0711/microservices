import { Feed, IDBConnector, User } from '@feed/data/database'
import { UserAdaptor } from '@feed/data/database'
import { FeedAdaptor } from '@feed/data/database'
import { createFeed } from '@feed/data/database'

import { FetchFeeds } from './impl-query'
import { FetchUnreadFeeds } from './impl-query'
import { FetchRecentPosts } from './impl-query'

import { PushFeed } from './impl-cmd'
import { ToggleFeedLikers } from './impl-cmd'
import { ToggleFeedDislikers } from './impl-cmd'
import { RemoveFeed } from './impl-cmd'

export interface IFeedDatabase {
  pushFeed({
    msg,
    writerUid,
  }: {
    msg: string
    writerUid: string
  }): Promise<User['uuid']>
  fetchFeeds({ writerUid: string }): Promise<Feed[]>
  fetchUnreadFeeds({
    loginUserUid,
    batchSize,
  }: {
    loginUserUid: string
    batchSize: number
  }): Promise<Feed[]>
  fetchRecentPosts({ userUid: string }): Promise<Feed[]>
  toggleFeedLikers({
    feedUid,
    likerUid,
  }: {
    feedUid: string
    likerUid: string
  }): Promise<Feed>
  toggleFeedDislikers({
    feedUid,
    dislikerUid,
  }: {
    feedUid: string
    dislikerUid: string
  }): Promise<Feed>
  removeFeed({
    ownerUid,
    feedUid,
  }: {
    ownerUid: string
    feedUid: string
  }): Promise<boolean>
}

export const FeedDatabase = (conn: IDBConnector): IFeedDatabase => {
  const feed = FeedAdaptor(conn)
  const user = UserAdaptor(conn)

  const pushFeed = PushFeed({ feed, user }, createFeed)
  const fetchFeeds = FetchFeeds({ feed, user })
  const fetchUnreadFeeds = FetchUnreadFeeds({ feed, user })
  const fetchRecentPosts = FetchRecentPosts({ feed, user })
  const toggleFeedLikers = ToggleFeedLikers({ feed, user })
  const toggleFeedDislikers = ToggleFeedDislikers({ feed, user })
  const removeFeed = RemoveFeed({ feed, user })

  return {
    pushFeed,
    fetchFeeds,
    fetchRecentPosts,
    fetchUnreadFeeds,
    toggleFeedLikers,
    toggleFeedDislikers,
    removeFeed,
  }
}
