import { FeedType } from 'typings'

export type FeedsStateType = {
  feeds: FeedType[]
  posts: FeedType[]
  loading: boolean
}

export type FeedsActionType = {
  getLoginUserFeedsCommand: () => Promise<void>
  getLoginUserPostsCommand: () => Promise<void>
  getSelectedUserPostsCommand: (userUid: string) => Promise<void>
  totalFeedsCount: number
}

export type FeedsModelType = {} & FeedsStateType & FeedsActionType
