import { IUserAdaptor } from '@feed/data/database'

export const RemoveFeedFromFollowers = (user: IUserAdaptor) => {
  return async ({
    userUid,
    feedUid,
  }: {
    userUid: string
    feedUid: string
  }): Promise<void> => {
    const followers = await user.findUserFollowers(userUid)
    
    for (const follower of followers) {
      await user.deleteUserFeed(follower, feedUid)
    }
  }
}
