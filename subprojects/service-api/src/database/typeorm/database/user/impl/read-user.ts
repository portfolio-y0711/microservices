import { IUserAdaptor, User } from '@feed/database'

export const ReadUser
    = (user: IUserAdaptor) => {
        return async (userUid: string): Promise<User> => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await user.findUserProfileById(userUid)
        }
    }
