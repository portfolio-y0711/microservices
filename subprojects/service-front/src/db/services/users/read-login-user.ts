import { IApi } from 'db/api'
import { IUserQueryType } from 'typings'

export const ReadLoginUser = (api: IApi) => async () => {
  const { LOGIN_USER_PROFILE } = IUserQueryType
  const user = await api.getUser(LOGIN_USER_PROFILE)
  return user
}
