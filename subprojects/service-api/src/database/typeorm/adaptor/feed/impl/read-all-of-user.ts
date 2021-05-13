import { Connection } from 'typeorm'
import { Feed } from '@feed/database'
import { IDBConnection } from '@feed/database'

export const ReadAllofUser
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<Feed[]> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(Feed)
                .createQueryBuilder('f')
                .innerJoinAndSelect('f.writer', 'fw')
                .where('fw.uuid = :userUid')
                .setParameter('userUid', userUid)
                .getMany()
        }
    }
