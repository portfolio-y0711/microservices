export enum IUserType {
    LOGIN_USER = 'login_user',
    SELECT_USER = 'select_user'
}

export enum IFeedQueryType {
    UNREAD = 'unread',
    RECENT = 'recent'
}

interface IFeedQuery {
    target: IUserType
    query: IFeedQueryType
}

export enum IFeedQueryType {
    LOGIN_USER_UNREAD_FEEDS = 'login_user_unread_feeds',
    LOGIN_USER_RECENT_POSTS = 'login_user_recent_posts',
    SELECT_USER_RECENT_POSTS = 'select_user_recent_posts'
}

export const iFeedQueryMap: Map<string, IFeedQuery> 
    = new Map([
        [
            IFeedQueryType.LOGIN_USER_UNREAD_FEEDS,
            {
                target: IUserType.LOGIN_USER,
                query: IFeedQueryType.UNREAD
            }            
        ],
        [
            IFeedQueryType.LOGIN_USER_RECENT_POSTS,
            {
                target: IUserType.LOGIN_USER,
                query: IFeedQueryType.RECENT
            }            
        ],
        [
            IFeedQueryType.SELECT_USER_RECENT_POSTS,
            {
                target: IUserType.SELECT_USER,
                query: IFeedQueryType.RECENT
            }            
        ],
    ])
