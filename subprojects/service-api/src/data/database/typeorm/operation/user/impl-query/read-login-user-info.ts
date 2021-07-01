import { IUserAdaptor } from '@feed/data/database'
import { User } from '@feed/data/database'

export const ReadLoginUserInfo = (user: IUserAdaptor) => {
  return async (userUid: string): Promise<User> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await user.findLoginUserInfo(userUid)
  }
}
