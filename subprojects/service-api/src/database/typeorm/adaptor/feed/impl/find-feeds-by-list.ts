import { Connection } from 'typeorm'
import { Feed } from '@feed/database'
import { IDBConnection } from '@feed/database'

export const FindFeedsByList
    = (conn: IDBConnection) => {
        return async (feedlist: string[]): Promise<Feed[]> => {
            const db: Connection = await conn.getConnection()
            try{
                const feeds = await db.createQueryBuilder()
                    .select(['f.uuid', 'f.msg', 'f.likers', 'f.dislikers', 'fw.uuid'])
                    .from(Feed, 'f')
                    .leftJoin('f.writer', 'fw')
                    .where('f.uuid IN (:...uuids)', { uuids: feedlist })
                    .getMany()
                return feeds
            } catch(e) {
                console.log(e)
                throw Error(e)
            }
        }
    }