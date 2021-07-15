import { Feed, IDBConnector, User } from '@feed/data/database'
import { UserAdaptor } from '@feed/data/database'
import { FeedAdaptor } from '@feed/data/database'
import { createFeed } from '@feed/data/database'

import { FetchFeeds } from './impl-query'
import { FetchUnreadFeeds } from './impl-query'
import { FetchRecentPosts } from './impl-query'
import { FetchOriginalPostWriter } from './impl-query'

import { PushFeed } from './impl-cmd'
import { PushComment } from './impl-cmd'
import { ToggleFeedLikers } from './impl-cmd'
import { ToggleFeedDislikers } from './impl-cmd'
import { RemoveFeed } from './impl-cmd'
import { RemoveComment } from './impl-cmd'

export interface IFeedDatabase {
  pushComment({
    originalFeedUid: feedUid,
    commentFeedUid: commentUid,
  }: {
    originalFeedUid: string
    commentFeedUid: string
  }): Promise<void>

  pushFeed({
    parentUid,
    msg,
    writerUid,
  }: {
    parentUid: string
    msg: string
    writerUid: string
  }): Promise<string>

  fetchFeeds({ writerUid: string }): Promise<Feed[]>

  fetchUnreadFeeds({
    loginUserUid,
    batchSize,
  }: {
    loginUserUid: string
    batchSize: number
  }): Promise<Feed[]>

  fetchRecentPosts({ userUid: string }): Promise<Feed[]>

  fetchOriginalPostWriter(feedUid: string): Promise<string>

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
    feedUid,
  }: {
    feedUid: string
  }): Promise<void>

  removeComment({
    feedUid,
  }: {
    feedUid: string
  }): Promise<void>

}

export const FeedDatabase = (conn: IDBConnector): IFeedDatabase => {
  const feed = FeedAdaptor(conn)
  const user = UserAdaptor(conn)

  const pushFeed = PushFeed({ feed, user }, createFeed)
  const pushComment = PushComment({ feed, user })
  const fetchFeeds = FetchFeeds({ feed, user })
  const fetchUnreadFeeds = FetchUnreadFeeds({ feed, user })
  const fetchRecentPosts = FetchRecentPosts({ feed, user })
  const toggleFeedLikers = ToggleFeedLikers({ feed, user })
  const toggleFeedDislikers = ToggleFeedDislikers({ feed, user })
  const removeFeed = RemoveFeed({ feed, user })
  const removeComment = RemoveComment({ feed, user })
  const fetchOriginalPostWriter = FetchOriginalPostWriter({ feed, user })

  return {
    pushFeed,
    pushComment,
    fetchFeeds,
    fetchRecentPosts,
    fetchUnreadFeeds,
    toggleFeedLikers,
    toggleFeedDislikers,
    removeFeed,
    removeComment,
    fetchOriginalPostWriter 
  }
}
