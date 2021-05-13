export { UserAdaptor } from './user'
export { UserDetailAdaptor } from './user'

export { IUserAdaptor } from './user'
export { IUserDetailAdaptor } from './user'

export { FeedAdaptor } from './feed'
export { IFeedAdaptor } from './feed'

import { IUserAdaptor } from './user'
import { IFeedAdaptor } from './feed'

export interface IFeedAdaptors {
    user: IUserAdaptor
    feed: IFeedAdaptor
}


