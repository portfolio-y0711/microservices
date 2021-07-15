export interface IChatStore {
  addUser: (userUid: string, socketId: string) => void
  removeUser: (userUid: string) => void
  getUsers: () => string[]
  getSocketIds: () => string[]
  getUser: (userUid: string) => string
  addMessage: (message: string) => void
  getMessages: () => any[]
}

export const createChatStore = (userMap: Map<string, string>, messages: string[]): IChatStore => {
  let _messages = messages
  const addUser = ((userMap: Map<string, string>) => (userUid: string, socketId: string) => {
    userMap.set(userUid, socketId)
  })(userMap)

  const removeUser = ((userMap: Map<string, string>) => (userUid: string) => {
    userMap.delete(userUid)
  })(userMap)

  const getSocketIds = ((userMap: Map<string, string>) => () => {
    return Array.from(userMap.values())
  })(userMap)

  const getUsers = ((userMap: Map<string, string>) => () => {
    return Array.from(userMap.keys())
  })(userMap)

  const getUser = ((userMap: Map<string, string>) => (userUid: string) => {
    return userMap.get(userUid)
  })(userMap)

  const addMessage = (message: string) => {
    _messages.push(message)
  }

  const getMessages = () => {
    return [
      {
        name: 'Bot',
        uuid: '32f9',
        img: 'bot',
        msg: 'Welcome!\nType a message and press Send Message to continue the chat.',
      },
      ..._messages.slice(-9)
    ]
  }

  return {
    addUser,
    removeUser,
    getSocketIds,
    getUsers,
    getUser,
    addMessage,
    getMessages
  }
}


export interface IFeedStore {
  addUser: (userUid: string, socketId: string) => void
  removeUser: (userUid: string) => void
  getUser: (userUid: string) => string
  hasUser: (userUid: string) => boolean
}

export const createFeedStore = (userMap: Map<string, string>): IFeedStore => {
  const addUser = ((userMap: Map<string, string>) => (userUid: string, socketId: string) => {
    userMap.set(userUid, socketId)
  })(userMap)

  const removeUser = ((userMap: Map<string, string>) => (userUid: string) => {
    userMap.delete(userUid)
  })(userMap)

  const getUser = ((userMap: Map<string, string>) => (userUid: string) => {
    return userMap.get(userUid)
  })(userMap)

  const hasUser = ((userMap: Map<string, string>) => (userUid: string) => {
    return userMap.has(userUid)
  })(userMap)

  return {
    addUser,
    removeUser,
    getUser,
    hasUser,
  }
}
