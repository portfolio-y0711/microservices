import { IDBConnector } from '@feed/data/database'
import { Connection, DeleteResult, UpdateResult } from 'typeorm'
import { User, UserDetail } from '@feed/data/database/typeorm/entities'

export const FindUserId = (conn: IDBConnector) => {
  return async (userUid: string): Promise<string> => {
    try {
      const db: Connection = await conn.getConnection()
      const { userId } = await db
        .getRepository(User)
        .createQueryBuilder('user')
        .select(['user.userId'])
        .where('user.uuid = :uuid', { uuid: userUid })
        .getOneOrFail()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return userId
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  }
}

export const CreateUserDetail = (conn: IDBConnector) => {
  return async (userDetail: UserDetail): Promise<UserDetail> => {
    try {
      const db: Connection = await conn.getConnection()
      return db.getRepository(UserDetail).save(userDetail)
    } catch (e) {
      throw Error(e)
    }
  }
}

export const ReadAllUserDetail = (conn: IDBConnector) => {
  return async (): Promise<UserDetail[]> => {
    const db: Connection = await conn.getConnection()
    return db.getRepository(UserDetail).find()
  }
}

export const DeleteUserDetail = (conn: IDBConnector) => {
  return async (userUid: string): Promise<DeleteResult> => {
    const db: Connection = await conn.getConnection()
    return db
      .getRepository(UserDetail)
      .createQueryBuilder('userdetail')
      .delete()
      .from(UserDetail)
      .where('uuid = :uuid', { uuid: userUid })
      .execute()
  }
}

export const ReadUserDetail = (conn: IDBConnector) => {
  return async (userUid: string): Promise<UserDetail> => {
    const db: Connection = await conn.getConnection()
    return db.getRepository(UserDetail).findOneOrFail({
      where: {
        uuid: userUid,
      },
    })
  }
}

export const UpdateUserDetail = (conn: IDBConnector) => {
  return async (userDetail: UserDetail): Promise<UpdateResult> => {
    const db: Connection = await conn.getConnection()
    return db
      .createQueryBuilder()
      .update(UserDetail)
      .set({ ...userDetail })
      .where('uuid = :uuid', { uuid: userDetail.uuid })
      .execute()
  }
}
