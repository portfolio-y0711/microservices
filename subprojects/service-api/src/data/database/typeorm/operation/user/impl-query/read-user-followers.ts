import { IUserAdaptor, User } from '@feed/data/database'

export const ReadUserFollowers =
  (user: IUserAdaptor) =>
  async (userUid: string): Promise<string[]> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await user.findUserFollowers(userUid)
  }
