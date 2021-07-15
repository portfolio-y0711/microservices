import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'
import { normalize } from './util'
import Logger from '@config/logger/winston'

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
      .select(['f.feedId', 'f.uuid', 'f.writerUid', 'f.childrenlist', 'f.parentUid', 'f.msg', 'f.likers', 'f.dislikers', 'f.createdAt'])
      .from(Feed, 'f')
      .where('f.uuid = :uuid', { uuid: uuid })
      .getOneOrFail()

    return normalize(feed)
  }
}

export const Create = (conn: IDBConnector) => {
  return async (feed: Feed): Promise<Feed> => {
    Logger.debug(`[@api/adaptor]: create '${feed.uuid}'`)
    const db: Connection = await conn.getConnection()
    const _feed = db.getRepository(Feed).save(feed)
    Logger.info(`[@api/adaptor]: create '${feed.uuid}'`)
    return _feed
  }
}

export const Update = (conn: IDBConnector) => {
  return async (feed: Feed): Promise<Feed> => {
    Logger.debug(`[@api/adaptor]: update '${feed.uuid}'`)
    const db: Connection = await conn.getConnection()
    const _feed = await db.getRepository(Feed).save(feed)
    Logger.info(`[@api/adaptor]: '${feed.uuid}' updated`)
    return _feed
  }
}

export const Delete = (conn: IDBConnector) => {
  return async (uuid: string): Promise<boolean> => {
    Logger.debug(`[@api/adaptor]: delete '${uuid}'`)
    const db: Connection = await conn.getConnection()
    await db
      .createQueryBuilder()
      .delete()
      .from(Feed, 'feed')
      .where('feed.uuid = :uuid', { uuid: uuid })
      .execute()
    Logger.info(`[@api/adaptor]: '${uuid}' deleted`)
    return true
  }
}
