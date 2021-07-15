import { Feed, User } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'
import { normalize } from '../../../adaptor/feed/impl/util';

export const stubUser: User = {
  name: undefined,
  userId: undefined,
  uuid: undefined,
  feedCursor: undefined,
  feeds: undefined,
  followers: undefined,
  leaders: undefined,
  posts: undefined,
  userDetail: undefined,
}

export const PushComment = (adaptors: IFeedAdaptors) => {
  return async ({
    originalFeedUid,
    commentFeedUid,
  }: {
    originalFeedUid: string
    commentFeedUid: string
  }): Promise<void> => {
    const { feed } = adaptors
    const originalFeed = normalize(await feed.read(originalFeedUid))
    const commentFeed = normalize(await feed.read(commentFeedUid))

    ;(originalFeed.childrenlist as string[]).push(commentFeed.uuid)
    commentFeed.parentUid = originalFeed.uuid
    
    await feed.update(originalFeed)
    await feed.update(commentFeed)
  }
}
