import { Connection } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const UpdateUserInfo = (conn: IDBConnector) => {
  return async (user: User): Promise<boolean> => {
    const db: Connection = await conn.getConnection()
    await db.getRepository(User).save(user)
    return true
  }
}
