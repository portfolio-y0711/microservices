import { Connection } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const DeleteUserPost = (conn: IDBConnector) => {
  return async (userUid: string, postUid: string): Promise<boolean> => {
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
        posts: [...user.posts].filter(pUid => pUid !== postUid),
      })
      .where('uuid = :uuid', { uuid: userUid })
      .execute()
    return true
  }
}
