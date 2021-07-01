import { IApi } from 'db/api'

export const UserLoginWithJwt = (api: IApi) => async (): Promise<boolean> => {
  const res = await api.loginWithToken()
  return res
}
