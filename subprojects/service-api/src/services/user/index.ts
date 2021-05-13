import { IUserDatabase, User } from '@feed/database'
import { FetchAll, FetchLoginUserInfo } from './services'
import { FollowFriend } from './services'
import { UnfollowFriend } from './services'
import { FetchUserInfo } from './services'

export interface IUserService {
    fetchAll: () => Promise<unknown>
    fetchUserInfo: (userUid: string) => Promise<User>
    fetchLoginUserInfo: (userUid: string) => Promise<User>
    followFriend: ({ loginUserUid, friendUid }: { loginUserUid: string, friendUid: string }) => Promise<boolean>
    unfollowFriend: ({ loginUserUid, friendUid }: { loginUserUid: string, friendUid: string }) => Promise<boolean>
}


export const UserService
    = (userDB: IUserDatabase): IUserService => {

        const fetchUserInfo = FetchUserInfo(userDB)
        const fetchLoginUserInfo = FetchLoginUserInfo(userDB)
        const fetchAll = FetchAll(userDB)
        const followFriend = FollowFriend(userDB)
        const unfollowFriend = UnfollowFriend(userDB)

        return {
            fetchLoginUserInfo,
            fetchUserInfo,
            fetchAll,
            followFriend,
            unfollowFriend,
        }
    }