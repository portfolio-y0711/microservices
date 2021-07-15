import { Feed, IFeed, User } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

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

export const PushFeed = (
  adaptors: IFeedAdaptors,
  createFeed: (userInput: IFeed) => Feed,
) => {
  return async ({
    parentUid,
    writerUid,
    msg,
  }: {
    parentUid: string
    writerUid: string
    msg: string
  }): Promise<string> => {
    const { feed } = adaptors
    const _feed = createFeed({ parentUid, msg, writerUid })
    const result = await feed.create(_feed)
    return result.uuid
  }
}
