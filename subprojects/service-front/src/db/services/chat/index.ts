import { IApi } from 'db/api'
import { ChatMessage } from 'store/models/chat/model.chat'
import { FetchChatMessages } from './fetch-chat-messages'
import { FetchChatUsers } from './fetch-chat-users'

export interface IChatService {
  fetchChatUsers: () => Promise<string[]>
  fetchChatMessages: () => Promise<ChatMessage[]>
}

const ChatService = (api: IApi): IChatService => {
  const fetchChatUsers = FetchChatUsers(api)
  const fetchChatMessages = FetchChatMessages(api)

  return {
    fetchChatUsers,
    fetchChatMessages,
  }
}
export default ChatService
