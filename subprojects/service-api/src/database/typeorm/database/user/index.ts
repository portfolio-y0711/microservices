import { IDBConnection, User, UserAdaptor } from '@feed/database'
import { ReadAll, AddUserLeader, ReadUser, RemoveUserLeader  } from './impl'
import { ReadLoginUserInfo } from './impl/read-login-user-info'
import { ReadUserProfile } from './impl/read-user-profile'

export interface IUserDatabase {
    readAll(): Promise<User[]>
    readLoginUserInfo(userUid: string): Promise<User>
    readUserProfile(userUid: string): Promise<User>
    addUserLeader({ follower, leader }: { follower: string, leader: string }): Promise<boolean>
    removeUserLeader({ follower, leader }: { follower: string, leader: string }): Promise<boolean>
    readUser(userUid: string): Promise<User>
}

export const UserDatabase
    = (conn: IDBConnection): IUserDatabase => {
        const userAdaptor = UserAdaptor(conn)
        const readAll = ReadAll(userAdaptor)
        const addUserLeader = AddUserLeader({ user: userAdaptor })
        const removeUserLeader = RemoveUserLeader({ user: userAdaptor })
        const readUser = ReadUser(userAdaptor)
        const readLoginUserInfo = ReadLoginUserInfo(userAdaptor)
        const readUserProfile = ReadUserProfile(userAdaptor)

        return {
            readUserProfile,
            readLoginUserInfo,
            readUser,
            readAll,
            addUserLeader,
            removeUserLeader,
        }
    }
