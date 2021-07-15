import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedDatabase } from '@feed/data/database'
import { IUserDatabase } from '@feed/data/database'

export const AddComment =
  ({ feedDB }: { feedDB: IFeedDatabase }) =>
  async ({
    feedUid,
    commentUid,
  }: {
    feedUid: string
    commentUid: string
  }): Promise<void> => {
    await feedDB.pushComment({
      originalFeedUid: feedUid,
      commentFeedUid: commentUid,
    })
  }

export const PublishPost = ({
  feedDB,
  userDB,
}: {
  feedDB: IFeedDatabase
  userDB: IUserDatabase
}) => {
  return async ({
    parentUid,
    msg,
    writerUid,
  }: {
    parentUid: string
    msg: string
    writerUid: string
  }): Promise<Feed['uuid']> => {
    
    return await feedDB.pushFeed({ parentUid, msg, writerUid })
  }
}

export const ThumbsUpFeed = (feedDB: IFeedDatabase) => {
  return async ({
    feedUid,
    likerUid,
  }: {
    feedUid: string
    likerUid: string
  }): Promise<Feed> => {
    const updatedFeed = await feedDB.toggleFeedLikers({
      feedUid: feedUid,
      likerUid: likerUid,
    })
    return updatedFeed
  }
}

export const ThumbsDownFeed = (feedDB: IFeedDatabase) => {
  return async ({
    feedUid,
    dislikerUid,
  }: {
    feedUid: string
    dislikerUid: string
  }): Promise<Feed> => {
    const updatedFeed = await feedDB.toggleFeedDislikers({
      feedUid: feedUid,
      dislikerUid: dislikerUid,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return updatedFeed
  }
}

export const DeleteFeed = (feedDB: IFeedDatabase) => {
  return async ({
    feedUid,
  }: {
    feedUid: string
  }): Promise<void> => {
    await feedDB.removeFeed({ feedUid })
  }
}


export const DeleteComment = (feedDB: IFeedDatabase) => {
  return async ({
    feedUid,
  }: {
    feedUid: string
  }): Promise<void> => {
    
    await feedDB.removeComment({ feedUid })
  }
}
