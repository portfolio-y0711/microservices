import { Feed } from '@feed/data/database/typeorm/entities'
import { User } from '@feed/data/database/typeorm/entities'
import { IFeedDatabase } from '@feed/data/database'

export const PublishPost = (feedDB: IFeedDatabase) => {
  return async ({
    msg,
    writerUid,
  }: {
    msg: string
    writerUid: string
  }): Promise<User['uuid']> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await feedDB.pushFeed({ msg, writerUid })
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
    ownerUid,
    feedUid,
  }: { ownerUid: string, feedUid: string }): Promise<boolean> => {
    await feedDB.removeFeed({ ownerUid, feedUid})
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return true
  }
}