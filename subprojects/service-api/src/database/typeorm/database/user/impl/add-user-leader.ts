import { IUserAdaptor } from '@feed/database'

export const AddUserLeader
    = ({ user }: { user: IUserAdaptor }) => {
        return async ({ follower, leader }: { follower: string, leader: string }): Promise<boolean> => {
            try {
                const _follower = await user.findUserFeedInfo(follower)
                const _leader = await user.findUserFeedInfo(leader)

                if (_follower.leaders === undefined) {
                    _follower.leaders = [_leader.uuid]
                } else {
                    _follower.leaders.push(_leader.uuid)
                }

                if (_leader.followers === undefined) {
                    _leader.followers = [_follower.uuid]
                } else {
                    _leader.followers.push(_follower.uuid)
                }

                const result1 = await user.updateUserInfo(_leader)
                const result2 = await user.updateUserInfo(_follower)
                
                return result1 && result2
            } catch (e) {
                throw Error('operations eror')
            }
        }
    }