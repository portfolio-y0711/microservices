export interface ChatMessage {
  uuid: string
  name: string
  img: string
  msg: string[]
}

export type ChatStateType = {
  messages: ChatMessage[]
  chatUsers: string[]
  loading: boolean
}

export type ChatActionType = {
  setMessageCommand: (messages: ChatMessage[]) => void
  addChatUserCommand: (chatUserUid: string) => void
  removeChatUserCommand: (chatUserUid: string) => void
  setChatUsersCommand: (users: string[]) => Promise<void>
}

export type ChatModelType = {} & ChatStateType & ChatActionType
