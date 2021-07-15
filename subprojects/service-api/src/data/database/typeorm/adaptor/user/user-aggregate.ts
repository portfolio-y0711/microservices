import { IDBConnector } from '@feed/data/database'
import { IUser, User } from '@feed/data/database/typeorm/entities'

import { DeleteUserFeed, DeleteUserPost, FindAll } from './impl/user-aggregate'
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
import { FindUserFollowers } from './impl/_aggregate/find-user-followers';

export interface IUserAdaptor {
  saveUserCursor: (userUid: string, cursor: number) => Promise<number>
  saveUserFeed: (userUid: string, feedUid: string) => Promise<boolean>
  saveUserPost: (userUid: string, postUid: string) => Promise<boolean>
  deleteUserPost: (userUid: string, postUid: string) => Promise<boolean>
  deleteUserFeed: (userUid: string, postUid: string) => Promise<boolean>
  findLoginUserInfo: (userUid: string) => Promise<User>
  findUserProfileById: (userUid: string) => Promise<User>
  findUserId: (userUid: string) => Promise<string>
  findUserFeedList: (userUid: string) => Promise<string[]>
  findUserFeedInfo: (userUid: string) => Promise<User>
  findUserFollowers: (userUid: string) => Promise<string[]>
  findUserPostsList: (userUid: string) => Promise<string[]>
  updateUserInfo: (user: IUser) => Promise<boolean>
  findAll: () => Promise<User[]>
}

export const UserAdaptor = (conn: IDBConnector): IUserAdaptor => {
  const findAll = FindAll(conn)
  const findUserId = FindUserId(conn)
  const findUserFeedInfo = FindUserFeedInfo(conn)
  const findUserFeedList = FindUserFeedList(conn)
  const findUserPostsList = FindUserPostsList(conn)
  const findUserProfileById = FindUserProfileById(conn)
  const findUserFollowers = FindUserFollowers(conn)
  const findLoginUserInfo = FindLoginUserInfo(conn)
  const updateUserInfo = UpdateUserInfo(conn)
  const saveUserFeed = SaveUserFeed(conn)
  const saveUserPost = SaveUserPost(conn)
  const deleteUserPost = DeleteUserPost(conn)
  const deleteUserFeed = DeleteUserFeed(conn)
  const saveUserCursor = SaveUserCursor(conn)

  return Object.freeze({
    saveUserPost,
    deleteUserPost,
    deleteUserFeed,
    findUserFeedInfo,
    findLoginUserInfo,
    findUserFeedList,
    findUserPostsList,
    findUserFollowers,
    findAll,
    findUserProfileById,
    findUserId,
    updateUserInfo,
    saveUserFeed,
    saveUserCursor,
  })
}
