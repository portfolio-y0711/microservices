import { useLocalObservable } from 'mobx-react-lite'
import { ChatModelType, ChatStateType, ChatMessage } from './model.chat'

const ChatModel = () => {
  const initialValues: ChatStateType = {
    messages: [],
    chatUsers: [],
    loading: false,
  }

  const setMessageCommand = (messages: ChatMessage[]) => {
    store.messages = messages
  }

  const setChatUsersCommand = async (users: string[]) => {
    store.chatUsers = [...users]
  }

  const addChatUserCommand = (chatUserUid: string) => {
    store.chatUsers = [...store.chatUsers, chatUserUid]
  }

  const removeChatUserCommand = (chatUserUid: string) => {
    store.chatUsers = store.chatUsers.filter((currentUserUid) => currentUserUid !== chatUserUid)
  }

  const store: ChatModelType = useLocalObservable(() => {
    return {
      ...initialValues,
      setMessageCommand,
      addChatUserCommand,
      removeChatUserCommand,
      setChatUsersCommand,
    }
  })

  return store
}

export default ChatModel
