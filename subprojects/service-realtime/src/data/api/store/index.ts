export interface IChatStore {
  addUser: (userUid: string) => void
  removeUser: (userUid: string) => void
  getUsers: () => void
}

export const createChatStore = (userSet: Set<string>): IChatStore => {
  const addUser = ((userSet: Set<string>) => (userUid: string) => {
    userSet.add(userUid)
  })(userSet)

  const removeUser = ((userSet: Set<string>) => (userUid: string) => {
    userSet.delete(userUid)
  })(userSet)

  const getUsers = ((userMap: Set<string>) => () => {
    return Array.from(userMap.values())
  })(userSet)

  return {
    addUser,
    removeUser,
    getUsers,
  }
}
