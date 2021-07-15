import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const ReadComment = (conn: IDBConnector) => {
  return async (uuid: string): Promise<Feed> => {
    const db: Connection = await conn.getConnection()
    const ancestor = await db.getRepository(Feed).findOneOrFail({
      where: {
        uuid: uuid,
      },
    })
    const result = await db
      .getTreeRepository(Feed)
      .findDescendantsTree(ancestor)
    return result
  }
}
