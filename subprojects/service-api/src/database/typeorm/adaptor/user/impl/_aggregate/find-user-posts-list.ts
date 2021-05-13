import { Connection} from 'typeorm'
import { User } from '@feed/database'
import { IDBConnection } from '@feed/database'

export const FindUserPostsList
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
