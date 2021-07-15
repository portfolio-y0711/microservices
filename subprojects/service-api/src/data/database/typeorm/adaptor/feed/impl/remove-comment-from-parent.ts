import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'
import { normalize } from './util';

export const RemoveCommentFromParent = (conn: IDBConnector) => {
  return async (feedUid: string): Promise<boolean> => {
    const db: Connection = await conn.getConnection()
    
    const feed = normalize(await db.getRepository(Feed)
      .findOneOrFail({
        where: {
          uuid: feedUid
        }
      }))
    const parent = normalize(await db.getRepository(Feed).findOneOrFail({
      where: {
        uuid: feed.parentUid
      }
    }))
    await db.getRepository(Feed)
      .save({
        ...parent,
        childrenlist: (parent.childrenlist as string[]).filter(c => {
          return c != feedUid
        })
      })

    return true
  }
}
