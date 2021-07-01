import { IAuthDatabase } from '@gateway/data/database/typeorm/database'
import { UserCredential } from '@gateway/data/database/typeorm/entities/user/user-credential'


export const GetUserPass
    = ({ authDB }: { authDB: IAuthDatabase }) => {
        return async (userUid: string): Promise<UserCredential> => {
            const user = await authDB.readUserPass(userUid)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return user
        }
    }
