import { IUserDatabase } from '@feed/data/database'
import { AddUserFeedToList } from './services'
import { RemoveFeedFromList } from './services'
import { ToggleFollow } from './services'
import { AddUserPostToList } from './services'
import { RemovePostFromList } from './services'

export interface IUserCmdService {
  toggleFollow: ({
    loginUserUid,
    friendUid,
  }: {
    loginUserUid: string
    friendUid: string
  }) => Promise<boolean>

  addUserPostToList: ({
    loginUserUid,
    postUid,
  }: {
    loginUserUid: string
    postUid: string
  }) => Promise<void>

  addUserFeedToList: ({
    subscriberUid,
    feedUid,
  }: {
    subscriberUid: string
    feedUid: string
  }) => Promise<void>

  removePostFromList: ({
    loginUserUid,
    postUid,
  }: {
    loginUserUid: string
    postUid: string
  }) => Promise<void>

  removeFeedFromList: ({
    subscriberUid,
    feedUid,
  }: {
    subscriberUid: string
    feedUid: string
  }) => Promise<void>
}

export const UserCmdService = (userDB: IUserDatabase): IUserCmdService => {
  const removePostFromList = RemovePostFromList(userDB)
  const removeFeedFromList = RemoveFeedFromList(userDB)
  const addUserPostToList = AddUserPostToList(userDB)
  const addUserFeedToList = AddUserFeedToList(userDB)
  const toggleFollow = ToggleFollow(userDB)

  return {
    toggleFollow,
    addUserPostToList,
    addUserFeedToList,
    removePostFromList,
    removeFeedFromList,
  }
}
