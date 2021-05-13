import { Connection} from 'typeorm'
import { User } from '@gateway/database'
import { IDBConnection } from '@gateway/database'

export const FindLoginUserInfo
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<string[]> => {
            const db: Connection = await conn.getConnection()
            const { posts } = await db.getRepository(User)
                .createQueryBuilder()
                .from(User, 'u')
                .select(['u.posts'])
                .where('u.uuid = :uuid', { uuid: userUid })
                .getOneOrFail()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return posts
        }
    }
