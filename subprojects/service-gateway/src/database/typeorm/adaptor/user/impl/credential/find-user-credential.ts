import { IDBConnection } from '@gateway/database'
import { Connection } from 'typeorm'
import { UserCredential } from '@gateway/database/typeorm/entities'


export const FindUserCredential
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<UserCredential> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(UserCredential)
                .createQueryBuilder()
                .where('uuid = :uuid', { uuid: userUid })
                .getOneOrFail()
        }
    }