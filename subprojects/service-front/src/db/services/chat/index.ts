import { IApi } from 'db/api'
import { FetchChatUsers } from './fetch-chat-users'

export interface IChatService {
  fetchChatUsers: () => Promise<string[]>
}

const ChatService = (api: IApi): IChatService => {
  const fetchChatUsers = FetchChatUsers(api)

  return {
    fetchChatUsers,
  }
}
export default ChatService
