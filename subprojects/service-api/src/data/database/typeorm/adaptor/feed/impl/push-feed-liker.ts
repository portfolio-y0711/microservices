import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const PushFeedLiker = (conn: IDBConnector) => {
  return async ({ feedUid: feedUid, likerUid: likerUid }): Promise<Feed> => {
    const db: Connection = await conn.getConnection()
    try {
      const feed = await db
        .getRepository(Feed)
        .createQueryBuilder('feed')
        .where('feed.uuid = :uuid', { uuid: feedUid })
        .getOneOrFail()
      return feed
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  }
}
