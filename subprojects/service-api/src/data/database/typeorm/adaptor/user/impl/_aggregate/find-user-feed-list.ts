import { Connection } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const FindUserFeedList = (conn: IDBConnector) => {
  return async (userUid: string): Promise<string[]> => {
    const db: Connection = await conn.getConnection()
    const { feeds } = await db
      .getRepository(User)
      .createQueryBuilder()
      .from(User, 'u')
      .select(['u.feeds'])
      .where('u.uuid = :uuid', { uuid: userUid })
      .getOneOrFail()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return feeds as string[]
  }
}
