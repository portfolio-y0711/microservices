import { Feed, User } from '@feed/database/typeorm/entities'
import { IFeedDatabase } from '@feed/database'

export const ReadRecentPosts
    = (feedDB: IFeedDatabase) => {
        return async ({ userUid }: { userUid: string }): Promise<Feed[]> => {
            return await feedDB.fetchRecentPosts({ userUid })
        }
    }

export const ReadUnreadFeeds
    = (feedDB: IFeedDatabase) => {
        return async ({ loginUserUid, batchSize }: { loginUserUid: string, batchSize: number }): Promise<Feed[]> => {
            return await feedDB.fetchUnreadFeeds({ loginUserUid, batchSize })
        }
    }

export const PublishFeed
    = (feedDB: IFeedDatabase) => {
        return async ({ msg, writerUid }: { msg: string, writerUid: string }): Promise<User['uuid']> => {
            return await feedDB.pushFeed({ msg, writerUid })
        }
    }

export const ReadFeeds
    = (feedDB: IFeedDatabase) => {
        return async ({ writerUid }: { writerUid: string }): Promise<Feed[]> => {
            return await feedDB.fetchFeeds({ writerUid })
        }
    }


/*

    export const LikeComment
        = (feedDB: IFeedDatabase) => async() => {
            return await feedDB.pushLikeComment() as unknown
        }

    export const DislikeComment 
        = (feedDB: IFeedDatabase) => async() => {
            return await feedDB.pushDislikeComment() as unknown
        }

    export const AddComment 
        = (feedDB: IFeedDatabase) => async() => {
            return await feedDB.replyToFeed() as unknown
        }
*/