import { Feed, IFeed, User } from '@feed/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/database/typeorm/adaptor'

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

export const PushFeed
    = (adaptors: IFeedAdaptors,
        createFeed: (userInput: IFeed) => Feed) => {
        return async ({ writerUid, msg }: { writerUid: string, msg: string }): Promise<User['uuid']> => {
            const { user, feed } = adaptors
            const userId = await user.findUserId(writerUid)
            
            const _feed = createFeed({ msg, writer: { ...stubUser, userId: userId } })

            const result = await feed.create(_feed)

            await user.saveUserPost(writerUid, _feed.uuid)
            return result.uuid
        }
    }