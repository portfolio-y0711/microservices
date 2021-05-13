import { User } from '@feed/database'
import { IUserDatabase } from '@feed/database'

export const FetchLoginUserInfo
    = (userDB: IUserDatabase) => {
        return async (userUid: string): Promise<User> => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await userDB.readLoginUserInfo(userUid)
        }
    }

export const FetchUserInfo
    = (userDB: IUserDatabase) => {
        return async (userUid: string): Promise<User> => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await userDB.readUserProfile(userUid)
        }
    }

export const FollowFriend
    = (userDB: IUserDatabase) => {
        return async ({ loginUserUid, friendUid }: { loginUserUid: string, friendUid: string }): Promise<boolean> => {
            const result = await userDB.addUserLeader({ follower: loginUserUid, leader: friendUid })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result
        }
    }

export const UnfollowFriend
    = (userDB: IUserDatabase) => {
        return async ({ loginUserUid, friendUid }: { loginUserUid: string, friendUid: string }): Promise<boolean> => {
            const result = await userDB.removeUserLeader({ follower: loginUserUid, leader: friendUid })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result
        }
    }

export const FetchAll = (userDB: IUserDatabase) => {
    return async (): Promise<User[]> => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await userDB.readAll()
    }
}
