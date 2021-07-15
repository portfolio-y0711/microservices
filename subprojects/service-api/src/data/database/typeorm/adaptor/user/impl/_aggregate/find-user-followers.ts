import { Connection } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const FindUserFollowers = (conn: IDBConnector) => {
  return async (userUid: string): Promise<string[]> => {
    const db: Connection = await conn.getConnection()
    const { followers } = await db
      .getRepository(User)
      .createQueryBuilder()
      .from(User, 'u')
      .select(['u.followers'])
      .where('u.uuid = :uuid', { uuid: userUid })
      .getOneOrFail()
    return followers as string[]
  }
}
