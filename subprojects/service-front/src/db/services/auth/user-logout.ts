import { IApi } from 'db/api'

export const UserLogout = (api: IApi) => async (): Promise<boolean> => {
  return await api.logout()
}
