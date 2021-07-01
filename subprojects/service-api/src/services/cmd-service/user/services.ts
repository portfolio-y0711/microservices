import { IUserDatabase } from '@feed/data/database'

export const ToggleFollow = (userDB: IUserDatabase) => {
  return async ({
    loginUserUid,
    friendUid,
  }: {
    loginUserUid: string
    friendUid: string
  }): Promise<boolean> => {
    const result = await userDB.toggleFollow({
      follower: loginUserUid,
      leader: friendUid,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result
  }
}
