import { Connection} from 'typeorm'
import { User } from '@feed/database'
import { IDBConnection } from '@feed/database'

export const SaveUserFeed
    = (conn: IDBConnection) => {
        return async (userUid: string, feedUid: string): Promise<boolean> => {
            const db: Connection = await conn.getConnection()
            const user
                = await db.getRepository(User)
                    .findOneOrFail({
                        where: {
                            uuid: userUid
                        }
                    })
            if (user.feeds.length === 0) {
                user.feeds = [feedUid]
            } else {
                user.feeds.push(feedUid)
            }
            await db.createQueryBuilder()
                .update(User)
                .set({
                    feeds: [...user.feeds]
                })
                .where('uuid = :uuid', { uuid: userUid })
                .execute()
            return true
        }
    }