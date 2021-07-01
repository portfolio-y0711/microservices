import { IUserDatabase } from '@feed/data/database'
import { ToggleFollow } from './services'

export interface IUserCmdService {
  toggleFollow: ({
    loginUserUid,
    friendUid,
  }: {
    loginUserUid: string
    friendUid: string
  }) => Promise<boolean>
}

export const UserCmdService = (userDB: IUserDatabase): IUserCmdService => {
  const toggleFollow = ToggleFollow(userDB)

  return {
    toggleFollow,
  }
}
