import { IDBConnection } from '@feed/database'
import { IUser, User } from '@feed/database/typeorm/entities'

import { FindAll } from './impl/user-aggregate'
import { SaveUserCursor } from './impl/user-aggregate'
import { FindLoginUserInfo } from './impl/user-aggregate'
import { SaveUserFeed } from './impl/user-aggregate'
import { SaveUserPost } from './impl/user-aggregate'
import { FindUserFeedList } from './impl/user-aggregate'
import { FindUserPostsList } from './impl/user-aggregate'
import { UpdateUserInfo } from './impl/user-aggregate'
import { FindUserId } from './impl/user-detail'
import { FindUserProfileById } from './impl/detail/find-user-profile'
import { FindUserFeedInfo } from './impl/_aggregate/find-user-feed-info'

export interface IUserAdaptor {
    saveUserCursor: (userUid: string, cursor: number) => Promise<number>
    saveUserFeed: (userUid: string, feedUid: string) => Promise<boolean>
    saveUserPost: (userUid: string, postUid: string) => Promise<boolean>
    findLoginUserInfo: (userUid: string) => Promise<User>
    findUserProfileById: (userUid: string) => Promise<User>
    findUserId: (userUid: string) => Promise<string>
    findUserFeedList: (userUid: string) => Promise<string[]>
    findUserFeedInfo: (userUid: string) => Promise<User>
    findUserPostsList: (userUid: string) => Promise<string[]>
    updateUserInfo: (user: IUser) => Promise<boolean>
    findAll: () => Promise<User[]>
}

export const UserAdaptor
    = (conn: IDBConnection): IUserAdaptor => {

        const findAll = FindAll(conn)
        const findUserProfileById = FindUserProfileById(conn)
        const findUserId = FindUserId(conn)
        const findUserFeedInfo = FindUserFeedInfo(conn)
        const findUserFeedList = FindUserFeedList(conn)
        const findUserPostsList = FindUserPostsList(conn)
        const updateUserInfo = UpdateUserInfo(conn)
        const saveUserFeed = SaveUserFeed(conn)
        const saveUserPost = SaveUserPost(conn)
        const findLoginUserInfo = FindLoginUserInfo(conn)
        const saveUserCursor = SaveUserCursor(conn)
        
        return Object.freeze({
            saveUserPost,
            findUserFeedInfo,
            findLoginUserInfo,
            findUserFeedList,
            findUserPostsList,
            findAll,
            findUserProfileById,
            findUserId,
            updateUserInfo,
            saveUserFeed,
            saveUserCursor
        })
    }
