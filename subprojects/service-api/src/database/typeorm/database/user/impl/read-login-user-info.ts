import { IUserAdaptor } from '@feed/database'
import { User } from '@feed/database'

export const ReadLoginUserInfo
    = (user: IUserAdaptor) => {
        return async (userUid: string): Promise<User> => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await user.findLoginUserInfo(userUid)
        }
    }