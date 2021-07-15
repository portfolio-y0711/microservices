import { IFeedDatabase } from '@feed/data/database'
import { IUserDatabase } from '@feed/data/database'
import { Feed } from '@feed/data/database/typeorm/entities'
import { PublishPost, AddComment, DeleteComment } from './services';
// import { AddComment } from './services'
import { DeleteFeed } from './services'
import { ThumbsUpFeed } from './services'
import { ThumbsDownFeed } from './services'

export interface IFeedCmdService {
  addComment: ({
    feedUid,
    commentUid,
  }: {
    feedUid: string
    commentUid: string
  }) => Promise<void>
  publishPost: ({
    parentUid,
    writerUid,
    msg,
  }: {
    parentUid: string
    writerUid: string
    msg: string
  }) => Promise<Feed['uuid']>
  thumbsUpFeed: ({
    feedUid,
    likerUid,
  }: {
    feedUid: string
    likerUid: string
  }) => Promise<Feed>
  thumbsDownFeed: ({
    feedUid,
    dislikerUid,
  }: {
    feedUid: string
    dislikerUid: string
  }) => Promise<Feed>
  deleteFeed: ({
    feedUid,
  }: {
    feedUid: string
  }) => Promise<void>

  deleteComment: ({
    feedUid,
  }: {
    feedUid: string
  }) => Promise<void>
}

export const FeedCmdService = ({
  feedDB,
  userDB,
}: {
  feedDB: IFeedDatabase
  userDB: IUserDatabase
}): IFeedCmdService => {
  const addComment = AddComment({ feedDB })
  const publishPost = PublishPost({ feedDB, userDB })
  const thumbsUpFeed = ThumbsUpFeed(feedDB)
  const thumbsDownFeed = ThumbsDownFeed(feedDB)
  const deleteFeed = DeleteFeed(feedDB)
  const deleteComment = DeleteComment(feedDB)

  return {
    addComment,
    publishPost,
    thumbsUpFeed,
    thumbsDownFeed,
    deleteFeed,
    deleteComment,
  }
}
