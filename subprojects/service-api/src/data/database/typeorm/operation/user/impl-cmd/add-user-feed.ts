import { IUserAdaptor } from '@feed/data/database'

export const AddUserFeed = (user: IUserAdaptor) => {
  return async ({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<boolean> => {
    
    return user.saveUserFeed(userUid, feedUid)
  }
}
