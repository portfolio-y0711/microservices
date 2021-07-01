import { IDBConnection } from "@gateway/data/database"
import { Connection, DeleteResult } from 'typeorm'
import { UserCredential } from '@gateway/data/database/typeorm/entities'

export const CreateUserCredential
    = (conn: IDBConnection) => {
        return async (userCredential: UserCredential): Promise<UserCredential> => {
            try {
                const db: Connection = await conn.getConnection()
                return db.getRepository(UserCredential).save(userCredential)
            } catch (e) {
                throw Error(e)
            }
        }
    }

export const ReadUserCredential
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<UserCredential> => {
            const db: Connection = await conn.getConnection()
            return await db.getRepository(UserCredential)
                .findOneOrFail({
                    where: {
                        uuid: userUid
                    }
                })
        }
    }

export const DeleteUserCredential
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<DeleteResult> => {
            const db: Connection = await conn.getConnection()
            return await db.getRepository(UserCredential)
                .createQueryBuilder('uc')
                .delete()
                .from(UserCredential)
                .where('uuid = :uuid', { uuid: userUid })
                .execute()
        }
    }
