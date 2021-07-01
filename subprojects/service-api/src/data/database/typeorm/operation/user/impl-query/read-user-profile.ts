import { IUserAdaptor, User } from '@feed/data/database'

export const ReadUserProfile =
  (user: IUserAdaptor) =>
  async (userUid: string): Promise<User> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await user.findUserProfileById(userUid)
  }
