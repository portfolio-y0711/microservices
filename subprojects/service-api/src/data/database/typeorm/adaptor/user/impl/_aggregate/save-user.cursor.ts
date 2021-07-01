import { Connection, UpdateResult } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const SaveUserCursor = (conn: IDBConnector) => {
  return async (userUid: string, cursor: number): Promise<number> => {
    const db: Connection = await conn.getConnection()
    const result = await db
      .createQueryBuilder()
      .update(User)
      .set({
        feedCursor: cursor,
      })
      .where('uuid = :uuid', { uuid: userUid })
      .execute()
    if (result instanceof UpdateResult) {
      return cursor
    } else {
      throw Error('update failed')
    }
  }
}
