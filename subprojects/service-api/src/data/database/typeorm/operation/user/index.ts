import { IDBConnector, User, UserAdaptor } from '@feed/data/database'

import { ReadAll } from './impl-query'
import { ReadUser } from './impl-query'
import { ReadLoginUserInfo } from './impl-query'
import { ReadUserProfile } from './impl-query'

import { ToggleFollow } from './impl-cmd'
import { AddUserPost } from './impl-cmd/add-user-post'
import { RemoveUserPost } from './impl-cmd/remove-user-post'
import { RemoveUserFeed } from './impl-cmd/remove-user-feed'
import { AddUserFeed } from './impl-cmd/add-user-feed'
// import { RemoveFeedFromFollowers } from './impl-cmd/remove-read-from-followers'
import { ReadUserFollowers } from './impl-query/read-user-followers';

export interface IUserDatabase {
  readAll(): Promise<User[]>
  readLoginUserInfo(userUid: string): Promise<User>
  readUserProfile(userUid: string): Promise<User>
  addUserPost({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<boolean>

  addUserFeed({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<boolean>

  removeUserPost({
    userUid,
    feedUid
  }: {
    userUid: string,
    feedUid: string
  }): Promise<void>

  removeUserFeed({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<void>

  readUser(userUid: string): Promise<User>
  // removeFeedFromFollowers({
  //   userUid,
  //   feedUid,
  // }: {
  //   userUid: string
  //   feedUid: string
  // }): Promise<void>

  findUserFollowers(userUid: string): Promise<string[]>

  toggleFollow({
    follower,
    leader,
  }: {
    follower: string
    leader: string
  }): Promise<boolean>
}

export const UserDatabase = (conn: IDBConnector): IUserDatabase => {
  const userAdaptor = UserAdaptor(conn)

  const readAll = ReadAll(userAdaptor)
  const readUser = ReadUser(userAdaptor)
  const readLoginUserInfo = ReadLoginUserInfo(userAdaptor)
  const readUserProfile = ReadUserProfile(userAdaptor)
  const addUserPost = AddUserPost(userAdaptor)
  const addUserFeed = AddUserFeed(userAdaptor)
  const removeUserPost = RemoveUserPost(userAdaptor)
  const removeUserFeed = RemoveUserFeed(userAdaptor)

  const findUserFollowers = ReadUserFollowers(userAdaptor)
  // const removeFeedFromFollowers = RemoveFeedFromFollowers(userAdaptor)
  // const addUserLeader = AddUserLeader({ user: userAdaptor })
  // const removeUserLeader = RemoveUserLeader({ user: userAdaptor })

  const toggleFollow = ToggleFollow({ user: userAdaptor })

  return {
    readUserProfile,
    readLoginUserInfo,
    readUser,
    readAll,
    addUserPost,
    removeUserPost,
    removeUserFeed,
    addUserFeed,
    findUserFollowers,
    // removeFeedFromFollowers,
    // addUserLeader,
    // removeUserLeader,
    toggleFollow,
  }
}
