import { IApi } from 'db/api'

export const UserLogin =
  (api: IApi) =>
  async (userUid: string, password: string): Promise<string> => {
    const res = await api.login(userUid, password)
    return res
  }
