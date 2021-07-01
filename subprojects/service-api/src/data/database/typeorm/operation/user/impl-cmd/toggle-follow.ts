import { IUserAdaptor } from '@feed/data/database'

export const ToggleFollow = ({ user }: { user: IUserAdaptor }) => {
  return async ({
    follower,
    leader,
  }: {
    follower: string
    leader: string
  }): Promise<boolean> => {
    try {
      const _follower = await user.findUserFeedInfo(follower)
      const _leader = await user.findUserFeedInfo(leader)

      {
        _follower.leaders == undefined
          ? (_follower.leaders = [_leader.uuid])
          : !_follower.leaders.includes(_leader.uuid)
          ? _follower.leaders.push(_leader.uuid)
          : (_follower.leaders = _follower.leaders.filter(
              (leader) => leader !== _leader.uuid,
            ))
      }

      {
        _leader.followers == undefined
          ? (_leader.followers = [_follower.uuid])
          : !_leader.followers.includes(_follower.uuid)
          ? _leader.followers.push(_follower.uuid)
          : (_leader.followers = _leader.followers.filter(
              (follower) => follower !== _follower.uuid,
            ))
      }
      const result1 = await user.updateUserInfo(_leader)
      const result2 = await user.updateUserInfo(_follower)
      return result1 && result2
    } catch (e) {
      throw Error('operations eror')
    }
  }
}
