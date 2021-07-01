export enum IFeedQueryType {
    LOGIN_USER_UNREAD_FEEDS = 'login_user_unread_feeds',
    LOGIN_USER_RECENT_POSTS = 'login_user_recent_posts',
    SELECT_USER_RECENT_POSTS = 'select_user_recent_posts'
}

export interface IFeedQuery {
    target: string
    query: string
}


export const createFeedQueryType
    = (userInput: any): IFeedQueryType => {
        const { LOGIN_USER_RECENT_POSTS, LOGIN_USER_UNREAD_FEEDS, SELECT_USER_RECENT_POSTS} = IFeedQueryType
        const { target, query } = userInput
        if (target === 'login_user') {
            switch (query) {
                case 'unread':
                    return LOGIN_USER_UNREAD_FEEDS
                case 'recent':
                    return LOGIN_USER_RECENT_POSTS
            }
        } 
        if (target === 'select_user') {
            switch (query) {
                case 'recent':
                    return SELECT_USER_RECENT_POSTS
            }
        }
        throw Error('no such feed command')
    }

export const iFeedQueryMap: Map<string, IFeedQuery>
    = new Map([
        [
            IFeedQueryType.LOGIN_USER_UNREAD_FEEDS,
            {
                target: 'login_user',
                query: 'unread'
            }
        ],
        [
            IFeedQueryType.LOGIN_USER_RECENT_POSTS,
            {
                target: 'login_user',
                query: 'recent'
            }
        ],
        [
            IFeedQueryType.SELECT_USER_RECENT_POSTS,
            {
                target: 'select_user',
                query: 'recent'
            }
        ],
    ])