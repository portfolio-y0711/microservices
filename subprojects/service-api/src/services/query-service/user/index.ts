import { IUserDatabase } from '@feed/data/database'
import { User } from '@feed/data/database'
import { FetchAll, FetchUserSubscribers } from './services'
import { FetchLoginUserInfo } from './services'
import { FetchUserInfo } from './services'

export interface IUserQueryService {
  fetchAll: () => Promise<User[]>
  fetchUserInfo: (userUid: string) => Promise<User>
  fetchUserSubscribers: (userUid: string) => Promise<string[]>
  fetchLoginUserInfo: (userUid: string) => Promise<User>
}

export const UserQueryService = (userDB: IUserDatabase): IUserQueryService => {
  const fetchAll = FetchAll(userDB)
  const fetchUserInfo = FetchUserInfo(userDB)
  const fetchLoginUserInfo = FetchLoginUserInfo(userDB)
  const fetchUserSubscribers = FetchUserSubscribers(userDB)

  return {
    fetchLoginUserInfo,
    fetchUserSubscribers,
    fetchUserInfo,
    fetchAll,
  }
}
