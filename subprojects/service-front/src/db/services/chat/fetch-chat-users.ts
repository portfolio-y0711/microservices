import { IApi } from 'db/api'

export const FetchChatUsers = (api: IApi) => async (): Promise<string[]> => {
  return await api.getChatUsers()
}
