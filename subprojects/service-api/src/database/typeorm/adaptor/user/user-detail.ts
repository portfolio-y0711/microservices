import { UpdateResult } from 'typeorm'
import { UserDetail } from '@feed/database/typeorm/entities'
import { IDBConnection } from '@feed/database'

import { CreateUserDetail } from './impl/user-detail'
import { ReadAllUserDetail } from './impl/user-detail'
import { ReadUserDetail } from './impl/user-detail'
import { UpdateUserDetail } from './impl/user-detail'
import { DeleteUserDetail } from './impl/user-detail'
import { IDatabaseAdaptor } from '@feed/typings'

export interface IUserDetailAdaptor
    extends IDatabaseAdaptor<UserDetail> {
    update: (userDetail: UserDetail) => Promise<UpdateResult>
    readAll: () => Promise<UserDetail[]>
}
export const UserDetailAdaptor
    = (conn: IDBConnection): IUserDetailAdaptor => {

        // IDatabaseAdaptor<UserDetail>
        const create = CreateUserDetail(conn)
        const read = ReadUserDetail(conn)
        const delete_ = DeleteUserDetail(conn)

        // IUserDetailDatabaseAdaptor 
        const readAll = ReadAllUserDetail(conn)
        const update = UpdateUserDetail(conn)

        return Object.freeze({
            // IDatabaseAdaptor<UserDetail>
            create,
            delete_,
            read,
            // IUserDetailDatabaseAdaptor 
            readAll,
            update,
        })
    }