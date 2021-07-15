export { IUserType } from './vo/feed-query-type'

export { iFeedQueryMap } from './vo/feed-query-type'
export { IFeedQueryType } from './vo/feed-query-type'

export { iUserQueryMap } from './vo/user-query-type'
export { IUserQueryType } from './vo/user-query-type'

export { iUserCommandMap } from './vo/user-command-type'
export { IUserCommandType } from './vo/user-command-type'

export { iFeedCommandMap } from './vo/feed-command-type'
export { IFeedCommandType } from './vo/feed-command-type'

export type { IFetchConfig } from './application'

export type UserType = {
  userId?: string
  uuid: string
  name: string
  img: string
  device: string
  deviceIcon: string
  leaders?: string[]
  followers?: string[]
  feedCursor: number
  feeds?: FeedType['uuid'][]
}

export type FeedType = {
  id?: string
  uuid?: string
  writerUid: UserType['uuid']
  msg: string
  // replies?: FeedType[]
  // parent?: FeedType
  childrenlist: string[]
  parentUid: string
  likers?: UserType['uuid'][]
  dislikers?: UserType['uuid'][]
  createdAt?: string
}
