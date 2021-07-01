import { IDBConnector, User, UserAdaptor } from '@feed/data/database'

import { ReadAll } from './impl-query'
import { ReadUser } from './impl-query'
import { ReadLoginUserInfo } from './impl-query'
import { ReadUserProfile } from './impl-query'

import { AddUserLeader } from './impl-cmd'
import { RemoveUserLeader } from './impl-cmd'
import { ToggleFollow } from './impl-cmd'

export interface IUserDatabase {
  readAll(): Promise<User[]>
  readLoginUserInfo(userUid: string): Promise<User>
  readUserProfile(userUid: string): Promise<User>
  addUserLeader({
    follower,
    leader,
  }: {
    follower: string
    leader: string
  }): Promise<boolean>
  removeUserLeader({
    follower,
    leader,
  }: {
    follower: string
    leader: string
  }): Promise<boolean>
  readUser(userUid: string): Promise<User>
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

  const addUserLeader = AddUserLeader({ user: userAdaptor })
  const removeUserLeader = RemoveUserLeader({ user: userAdaptor })
  const toggleFollow = ToggleFollow({ user: userAdaptor })

  return {
    readUserProfile,
    readLoginUserInfo,
    readUser,
    readAll,

    addUserLeader,
    removeUserLeader,
    toggleFollow,
  }
}
