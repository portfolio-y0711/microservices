import { IApi } from 'db/api'
import { IUserQueryType } from 'typings'

export const ReadSelectedUser = (api: IApi) => async (userUid: string) => {
  const { SELECT_USER_PROFILE } = IUserQueryType
  const user = await api.getUser(SELECT_USER_PROFILE, userUid)
  return user
}
