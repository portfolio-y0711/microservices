import { IUserAdaptor } from '@feed/data/database'

export const RemoveUserFeed = (user: IUserAdaptor) => {
  return async ({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<void> => {
    await user.deleteUserFeed(userUid, feedUid)
  }
}
