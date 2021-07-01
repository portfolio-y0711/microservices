import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const FindFeedsByList = (conn: IDBConnector) => {
  return async (feedlist: string[]): Promise<Feed[]> => {
    const db: Connection = await conn.getConnection()
    try {
      const feeds = await db
        .createQueryBuilder()
        .select([
          'f.uuid',
          'f.msg',
          'f.likers',
          'f.dislikers',
          'fw.uuid',
          'f.createdAt',
        ])
        .from(Feed, 'f')
        .leftJoin('f.writer', 'fw')
        .where('f.uuid IN (:...uuids)', { uuids: feedlist })
        .orderBy('f.createdAt', 'DESC')
        .getMany()
      return feeds
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  }
}
