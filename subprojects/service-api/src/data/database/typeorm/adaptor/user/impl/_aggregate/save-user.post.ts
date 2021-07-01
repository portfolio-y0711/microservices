import { Connection } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const SaveUserPost = (conn: IDBConnector) => {
  return async (userUid: string, postUid: string): Promise<boolean> => {
    const db: Connection = await conn.getConnection()
    const user = await db.getRepository(User).findOneOrFail({
      where: {
        uuid: userUid,
      },
    })
    if (user.posts.length === 0) {
      user.posts = [postUid]
    } else {
      user.posts.push(postUid)
    }
    await db
      .createQueryBuilder()
      .update(User)
      .set({
        posts: [...user.posts],
      })
      .where('uuid = :uuid', { uuid: userUid })
      .execute()
    return true
  }
}
