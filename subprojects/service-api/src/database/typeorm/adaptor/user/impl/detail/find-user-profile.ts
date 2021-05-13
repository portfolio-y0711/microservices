import { IDBConnection } from '@feed/database'
import { Connection } from 'typeorm'
import { User } from '@feed/database/typeorm/entities'

export const FindUserProfileById
    = (conn: IDBConnection) => {
        return async (userUid: string): Promise<User> => {
            let result: User
            try {
                const db: Connection = await conn.getConnection()
                result = await db.getRepository(User)
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.userDetail', 'd')
                    .select(['user.name', 'user.uuid'])
                    .addSelect(['d.device', 'd.deviceIcon', 'd.img'])
                    .where('user.uuid = :uuid', { uuid: userUid })
                    .getOneOrFail()
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return result
            } catch (e) {
                console.log(e)
                throw Error(e)
            }
        }
    }
