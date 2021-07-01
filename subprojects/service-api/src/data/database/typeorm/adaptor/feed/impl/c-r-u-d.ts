import { Connection, DeleteResult, UpdateResult } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const ReadAll = (conn: IDBConnector) => {
  return async (): Promise<Feed[]> => {
    const db: Connection = await conn.getConnection()
    return db.getRepository(Feed).find()
  }
}

export const Read = (conn: IDBConnector) => {
  return async (uuid: string): Promise<Feed> => {
    const db: Connection = await conn.getConnection()
    const feed = await db
      .createQueryBuilder()
      .select('feed')
      .from(Feed, 'feed')
      .where('feed.uuid = :uuid', { uuid: uuid })
      .getOne()
    return [feed].map((f) => ({
      ...f,
      ...{
        likers:
          f.likers.length == 0
            ? []
            : !f.likers.includes(',')
            ? [f.likers as string]
            : (f.likers as string).split(','),
        dislikers:
          f.dislikers.length == 0
            ? []
            : !f.dislikers.includes(',')
            ? [f.dislikers as string]
            : (f.dislikers as string).split(','),
      },
    }))[0]
  }
}

export const Create = (conn: IDBConnector) => {
  return async (feed: Feed): Promise<Feed> => {
    const db: Connection = await conn.getConnection()
    return db.getRepository(Feed).save(feed)
  }
}

export const Update = (conn: IDBConnector) => {
  return async (feed: Feed): Promise<Feed> => {
    const db: Connection = await conn.getConnection()
    const _feed = await db.getRepository(Feed).save(feed)

    return _feed
  }
}

export const Delete = (conn: IDBConnector) => {
  return async (uuid: string): Promise<boolean> => {
    const db: Connection = await conn.getConnection()
    await db
      .getRepository(Feed)
      .createQueryBuilder()
      .delete()
      .from(Feed)
      .where('feed.uuid = :uuid', { uuid: uuid })
      .execute()
    return true
  }
}
