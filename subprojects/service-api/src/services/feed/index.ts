import { IFeedDatabase } from '@feed/database'
import { Feed, IUser } from '@feed/database/typeorm/entities'
import { PublishFeed } from './services'
import { ReadFeeds } from './services'
import { ReadUnreadFeeds } from './services'
import { ReadRecentPosts } from './services'

export interface IFeedService {
    publishFeed: ({ writerUid, msg }: { writerUid: string, msg: string }) => Promise<IUser['uuid']>
    readFeeds: ({ writerUid }: { writerUid: string }) => Promise<Feed[]>
    readUnreadFeeds: ({ loginUserUid, batchSize }: { loginUserUid: string, batchSize: number }) => Promise<Feed[]>
    readRecentPosts: ({ userUid }: { userUid: string }) => Promise<Feed[]>
}

export const FeedService
    = (feedDB: IFeedDatabase): IFeedService => {

        const publishFeed = PublishFeed(feedDB)
        const readFeeds = ReadFeeds(feedDB)
        const readUnreadFeeds = ReadUnreadFeeds(feedDB)
        const readRecentPosts = ReadRecentPosts(feedDB)

        return {
            publishFeed,
            readFeeds,
            readUnreadFeeds,
            readRecentPosts
        }
    }

/*
    backlogs:

    import { LikeComment } from './services'
    import { DislikeComment } from './services'
    import { AddComment } from './services'

    likeComment: ({ commentUid, userUid }: { commentUid: string, userUid: string }) => Promise<unknown>
    dislikeComment: ({ commentUid, userUid }: { commentUid: string, userUid: string }) => Promise<unknown>
    addComment: () => Promise<unknown>

    const likeComment = LikeComment(feedDB)
    const dislikeComment = DislikeComment(feedDB)
    const addComment = AddComment(feedDB)

    likeComment,
    dislikeComment,
    addComment,
*/