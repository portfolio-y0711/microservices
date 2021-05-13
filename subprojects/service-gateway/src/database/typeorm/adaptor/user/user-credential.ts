import { IDBConnection } from '@gateway/database'
import { UserCredential } from '@gateway/database/typeorm/entities'
import { IDatabaseAdaptor } from '@gateway/typings'
import { CreateUserCredential, FindUserCredential } from './impl/user-credential'

export interface IUserCredentialAdaptor 
    extends IDatabaseAdaptor<UserCredential> {

    findUserCredential: (userUid: string) => Promise<UserCredential>
}

export const UserCredentialAdaptor 
    = (conn: IDBConnection): IUserCredentialAdaptor => {

    const create = CreateUserCredential(conn)
    const findUserCredential = FindUserCredential(conn)

    return Object.freeze({
        create,
        findUserCredential
    })
}