import { Connection} from 'typeorm'
import { User } from '@gateway/data/database'
import { IDBConnection } from '@gateway/data/database'

export const UpdateUserInfo
    = (conn: IDBConnection) => {
        return async (user: User): Promise<boolean> => {
            const db: Connection = await conn.getConnection()
            await db.getRepository(User).save(user)
            return true
        }
    }