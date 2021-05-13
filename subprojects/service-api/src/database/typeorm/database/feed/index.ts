import { Feed, IDBConnection, User } from '@feed/database'
import { UserAdaptor } from '@feed/database'
import { FeedAdaptor } from '@feed/database'
import { createFeed } from '@feed/database'

import { PushFeed } from './impl'
import { FetchFeeds } from './impl'
import { FetchUnreadFeeds } from './impl'
import { FetchRecentPosts } from './impl'
/*
    import { ReplyToFeed } from './operations'
    import { PushDislikeComment } from './operations'
    import { PushLikeComment } from './operations'
*/

export interface IFeedDatabase {

    pushFeed({ msg, writerUid }: { msg: string, writerUid: string }): Promise<User['uuid']>
    fetchFeeds({ writerUid: string }): Promise<Feed[]>
    fetchUnreadFeeds({ loginUserUid, batchSize }:{ loginUserUid: string, batchSize: number }): Promise<Feed[]>
    fetchRecentPosts({ userUid: string }): Promise<Feed[]>

    // ⬆︎⬆︎⬆︎  ----- ︎implemented up to this line -----︎ ︎⬆︎⬆︎︎︎︎⬆︎

    // -- working on the next feature //  todo(✔) | in_progress (︎︎) | done()

    /*
        memo:
            로그인한 유저의 피드 읽기 

    */


    // --

    // ⬇︎⬇︎⬇  -----      ︎to be implemented      -----︎ ⬇︎⬇︎⬇


    /*
        replyToFeed(): Promise<unknown>
        pushLikeComment(): Promise<unknown>
        pushDislikeComment(): Promise<unknown>
    */
}


export const FeedDatabase
    = (conn: IDBConnection): IFeedDatabase => {
        const feed = FeedAdaptor(conn)
        const user = UserAdaptor(conn)

        const pushFeed = PushFeed({ feed, user }, createFeed)
        const fetchFeeds = FetchFeeds({ feed, user })
        const fetchUnreadFeeds = FetchUnreadFeeds({ feed, user })
        const fetchRecentPosts = FetchRecentPosts({ feed, user })

        /*
            const pushLikeComment = PushLikeComment({ feed, user, feedComment })
            const pushDislikeComment = PushDislikeComment({ feed, user, feedComment })
            const replyToFeed = ReplyToFeed({ feed, user, feedComment })
        */

        return {
            pushFeed,
            fetchFeeds,
            fetchRecentPosts,
            fetchUnreadFeeds,
            /*
                fetchFeed,
                pushLikeComment,
                pushDislikeComment,
                replyToFeed,
            */
        }
    }