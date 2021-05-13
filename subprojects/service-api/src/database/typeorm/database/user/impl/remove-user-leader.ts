import { IUserAdaptor } from '@feed/database'

export const RemoveUserLeader
    = ({ user }: { user: IUserAdaptor }) => {
        return async ({ follower, leader }: { follower: string, leader: string }): Promise<boolean> => {

            try {
                const _follower = await user.findUserFeedInfo(follower)
                const _leader = await user.findUserFeedInfo(leader)
                
                if (!_follower.leaders.includes(_leader.uuid)) {
                    throw Error('no leader')
                } else {
                    _follower.leaders = _follower.leaders.filter(leader => leader !== _leader.uuid)
                }
                if (!_leader.followers.includes(_follower.uuid)) {
                    throw Error('no follower')
                } else {
                    _leader.followers = _leader.followers.filter(follower => follower !== _follower.uuid)
                }

                const result1 = await user.updateUserInfo(_leader)
                const result2 = await user.updateUserInfo(_follower)

                return result1 && result2
            } catch (e) {
                throw Error('operations eror')
            }

        }
    }