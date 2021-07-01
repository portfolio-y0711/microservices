import { Connection, DeleteResult } from 'typeorm'
import { User } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'

export const FindAll = (conn: IDBConnector) => {
  return async (): Promise<User[]> => {
    const db: Connection = await conn.getConnection()
    return db
      .getRepository(User)
      .createQueryBuilder('u')
      .select(['u.uuid', 'u.name'])
      .leftJoin('u.userDetail', 'ud')
      .addSelect(['ud.img', 'ud.device', 'ud.deviceIcon'])
      .getMany()
  }
}

export const Create = (conn: IDBConnector) => {
  return async (user: User): Promise<User> => {
    const db: Connection = await conn.getConnection()
    return db.getRepository(User).save(user)
  }
}

export const Read = (conn: IDBConnector) => {
  return async (userUid: string): Promise<User> => {
    const db: Connection = await conn.getConnection()
    const result = await db
      .getRepository(User)
      .createQueryBuilder('user')
      // .select(['user.userId', 'user.uuid', 'user.name'])
      .where('user.uuid = :uuid', { uuid: userUid })
      .getOne()
    return result
  }
}

export const Delete = (conn: IDBConnector) => {
  return async (userUid: string): Promise<DeleteResult> => {
    const db: Connection = await conn.getConnection()
    return db
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('uuid = :uuid', { uuid: userUid })
      .execute()
  }
}
