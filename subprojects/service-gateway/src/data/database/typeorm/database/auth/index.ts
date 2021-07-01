import { IDBConnection, UserCredential, UserCredentialAdaptor } from '@gateway/data/database'
import { ReadUserPass } from './operations'

export interface IAuthDatabase {
    readUserPass(userUid: string): Promise<UserCredential>
}

export const AuthDatabase = (conn: IDBConnection): IAuthDatabase => {
    const userCredential = UserCredentialAdaptor(conn)
    const readUserPass = ReadUserPass(userCredential)
    return {
        readUserPass,
    }
}
