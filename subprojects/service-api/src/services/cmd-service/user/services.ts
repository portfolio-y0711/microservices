import { IUserDatabase } from '@feed/data/database'

export const ToggleFollow = (userDB: IUserDatabase) => {
  return async ({
    loginUserUid,
    friendUid,
  }: {
    loginUserUid: string
    friendUid: string
  }): Promise<boolean> => {
    const result = await userDB.toggleFollow({
      follower: loginUserUid,
      leader: friendUid,
    })
    return result
  }
}

export const AddUserFeedToList = (userDB: IUserDatabase) => {
  return async ({
    subscriberUid,
    feedUid,
  }: {
    subscriberUid: string
    feedUid: string
  }): Promise<void> => {
    await userDB.addUserFeed({
      userUid: subscriberUid,
      feedUid: feedUid  
    })
  }
}

export const RemoveFeedFromList = (userDB: IUserDatabase) => {
  return async ({
    subscriberUid,
    feedUid,
  }: {
    subscriberUid: string
    feedUid: string
  }): Promise<void> => {
    await userDB.removeUserFeed({
      userUid: subscriberUid,
      feedUid: feedUid,
    })
  }
}

export const RemovePostFromList = (userDB: IUserDatabase) => {
  return async ({
    loginUserUid,
    postUid,
  }: {
    loginUserUid: string
    postUid: string
  }): Promise<void> => {
    await userDB.removeUserPost({
      userUid: loginUserUid,
      feedUid: postUid,
    })
  }
}

export const AddUserPostToList = (userDB: IUserDatabase) => {
  return async ({
    loginUserUid,
    postUid,
  }: {
    loginUserUid: string
    postUid: string
  }): Promise<void> => {
    await userDB.addUserPost({
      userUid: loginUserUid,
      feedUid: postUid,
    })
  }
}
