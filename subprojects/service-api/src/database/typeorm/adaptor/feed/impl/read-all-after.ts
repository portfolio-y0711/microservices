import { Connection } from 'typeorm'
import { Feed } from '@feed/database'
import { IDBConnection } from '@feed/database'

export const ReadAllAfter
    = (conn: IDBConnection) => {
        return async (userId: string, start: number): Promise<unknown> => {
            const db: Connection = await conn.getConnection()
            return db.getRepository(Feed)
                .createQueryBuilder()
                .select('feed')
                .from(Feed, 'feed')
                .innerJoinAndSelect('feed.readers', 'readers', 'readers.userId = :userId', { userId: userId })
                .where('feed.feedno > :feedno', { feedno: start })
                .execute()
        }
    }