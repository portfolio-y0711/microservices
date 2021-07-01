import { IApi } from 'db/api'
import { UserType } from 'typings'
import { ReadUsers } from './read-users'

export interface IUIService {
  readUsers: () => Promise<UserType[]>
}

const UIService = (api?: IApi): IUIService => {
  const readUsers = ReadUsers(api)
  return {
    readUsers,
  }
}

export default UIService
