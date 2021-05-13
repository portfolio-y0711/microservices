import { Feed, IFeedQueryType } from '@feed/database'
import { IFeedService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { Request } from 'express'
import { createFeedQueryType } from '@feed/database/typeorm/vo/feed-query'

export const GetFeeds
    = (service: IFeedService) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            let login_user_uid: string
            if (httpRequest.body && 'login_user_uid' in httpRequest.body) {
                ({ login_user_uid } = httpRequest.body)

            }
            const { batchSize } = httpRequest.query

            const type = createFeedQueryType(httpRequest.query)
            const { LOGIN_USER_RECENT_POSTS, LOGIN_USER_UNREAD_FEEDS, SELECT_USER_RECENT_POSTS } = IFeedQueryType

            let result: Feed[]

            switch(type) {
                case LOGIN_USER_UNREAD_FEEDS:
                    result = await service.readUnreadFeeds({ loginUserUid: login_user_uid, batchSize: parseInt(batchSize as string) })
                    break
                case LOGIN_USER_RECENT_POSTS: 
                    result = await service.readRecentPosts({ userUid: login_user_uid })
                    break
                case SELECT_USER_RECENT_POSTS:
                    result = await service.readRecentPosts({ userUid: httpRequest.query.userUid as string })
                    break
            }
            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: result,
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }
