import { Connection, DeleteResult } from 'typeorm'
import { User } from '@gateway/data/database'
import { IDBConnection } from '@gateway/data/database'

export const FindAll
    = (conn: IDBConnection) => {
        return async (): Promise<User[]> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(User)
                .createQueryBuilder('u')
                .select(['u.uuid', 'u.name'])
                .leftJoin('u.userDetail', 'ud')
                .addSelect(['ud.img', 'ud.device', 'ud.deviceIcon'])
                .getMany()
        }
    }

export const Create
    = (conn: IDBConnection) => {
        return async (user: User): Promise<User> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(User).save(user)
        }
    }

export const Read
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<User> => {
            const db: Connection = await conn.getConnection()
            const result = await db.getRepository(User)
                .createQueryBuilder('user')
                // .select(['user.userId', 'user.uuid', 'user.name'])
                .where('user.uuid = :uuid', { uuid: userUid })
                .getOne()
            return result
        }
    }


export const Delete
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<DeleteResult> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(User)
                .createQueryBuilder()
                .delete()
                .from(User)
                .where('uuid = :uuid', { uuid: userUid })
                .execute()
        }
    }
