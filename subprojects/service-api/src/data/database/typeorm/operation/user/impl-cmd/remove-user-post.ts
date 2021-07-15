import { IUserAdaptor } from '@feed/data/database'

export const RemoveUserPost = (user: IUserAdaptor) => {
  return async ({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<void> => {
    await user.deleteUserPost(userUid, feedUid)
  }
}
