import { User } from '@feed/data/database'
import { IUserDatabase } from '@feed/data/database'

export const FetchLoginUserInfo = (userDB: IUserDatabase) => {
  return async (userUid: string): Promise<User> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await userDB.readLoginUserInfo(userUid)
  }
}

export const FetchUserInfo = (userDB: IUserDatabase) => {
  return async (userUid: string): Promise<User> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await userDB.readUserProfile(userUid)
  }
}

export const FetchAll = (userDB: IUserDatabase) => {
  return async (): Promise<User[]> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await userDB.readAll()
  }
}


export const FetchUserSubscribers = (userDB: IUserDatabase) => {
  return async (userUid: string): Promise<string[]> => {
    const result = await userDB.findUserFollowers(userUid)
    return result
  }
}
