import { Connection } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const DeleteUserFeed = (conn: IDBConnector) => {
  return async (userUid: string, feedUid: string): Promise<boolean> => {
    const db: Connection = await conn.getConnection()
    const user = await db.getRepository(User)
      .findOneOrFail({
        where: {
          uuid: userUid,
        },
      })
      
    await db
      .createQueryBuilder()
      .update(User)
      .set({
        feeds: [...user.feeds].filter(pUid => pUid !== feedUid),
      })
      .where('uuid = :uuid', { uuid: userUid })
      .execute()

    return true
  }
}
