import { IApi } from 'db/api'

export const ReadUsers = (api: IApi) => async () => {
  const users = await api.getUsers()
  return users
}
