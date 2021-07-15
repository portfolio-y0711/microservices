import { IUserAdaptor } from '@feed/data/database'

export const AddUserPost = (user: IUserAdaptor) => {
  return async ({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<boolean> => {
    
    return user.saveUserPost(userUid, feedUid)
  }
}
