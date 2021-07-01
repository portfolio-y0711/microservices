import { UserType } from 'typings'
import { ReadLoginUser } from './read-login-user'
import { IApi } from 'db/api'
import { ReadSelectedUser } from './read-selected-user'

export interface IUsersService {
  readLoginUser: () => Promise<UserType>
  readSelectedUser: (userUid: string) => Promise<UserType>
}

const UsersService = (api?: IApi): IUsersService => {
  const readLoginUser = ReadLoginUser(api)
  const readSelectedUser = ReadSelectedUser(api)

  return {
    readLoginUser,
    readSelectedUser,
  }
}

export default UsersService
