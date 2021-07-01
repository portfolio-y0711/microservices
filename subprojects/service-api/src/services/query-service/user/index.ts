import { IUserDatabase } from '@feed/data/database'
import { User } from '@feed/data/database'
import { FetchAll } from './services'
import { FetchLoginUserInfo } from './services'
import { FetchUserInfo } from './services'

export interface IUserQueryService {
  fetchAll: () => Promise<unknown>
  fetchUserInfo: (userUid: string) => Promise<User>
  fetchLoginUserInfo: (userUid: string) => Promise<User>
}

export const UserQueryService = (userDB: IUserDatabase): IUserQueryService => {
  const fetchUserInfo = FetchUserInfo(userDB)
  const fetchLoginUserInfo = FetchLoginUserInfo(userDB)
  const fetchAll = FetchAll(userDB)

  return {
    fetchLoginUserInfo,
    fetchUserInfo,
    fetchAll,
  }
}
