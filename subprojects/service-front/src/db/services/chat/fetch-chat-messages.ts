import { IApi } from 'db/api'

interface ChatMessage {
  name: string
  uuid: string
  img: string
  msg: string
}

export const FetchChatMessages = (api: IApi) => async (): Promise<ChatMessage[]> => {
  return await api.getChatMessages()
}
