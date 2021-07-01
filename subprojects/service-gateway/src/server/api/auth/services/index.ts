import { IAuthDatabase } from '@gateway/data/database'
import { UserCredential } from '@gateway/data/database'
import { GetUserPass } from './services'

export interface IAuthService {
    getUserPass: (userUid: string) => Promise<UserCredential>
}

export const AuthService
    = ({ authDB }: { authDB: IAuthDatabase }): IAuthService => {
        const getUserPass = GetUserPass({ authDB })

        return {
            getUserPass,
        }
    }
