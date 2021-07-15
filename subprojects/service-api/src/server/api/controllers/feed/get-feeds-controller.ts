import { Feed, IFeedQueryType } from '@feed/data/database'
import { IFeedQueryService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { Request } from 'express'
import { createFeedQueryType } from '@feed/data/database/typeorm/vo/feed-query'
import LOGGER from '@config/logger/winston'

export const GetFeeds = (service: IFeedQueryService) => {
  return async (httpRequest: Request): Promise<IHttpResponse> => {
    LOGGER.debug(`[@api/rest-controller] query-get-feeds`)
    let login_user_uid: string
    if (httpRequest.body && 'login_user_uid' in httpRequest.body) {
      ({ login_user_uid } = httpRequest.body)
    }
    const { batchSize } = httpRequest.query
    
    const type = createFeedQueryType(httpRequest.query)
    
    const {
      LOGIN_USER_RECENT_POSTS,
      LOGIN_USER_UNREAD_FEEDS,
      SELECT_USER_RECENT_POSTS,
    } = IFeedQueryType

    let result: Feed[]

    switch (type) {
      case LOGIN_USER_UNREAD_FEEDS:
        result = await service.readUnreadFeeds({
          loginUserUid: login_user_uid,
          batchSize: parseInt(batchSize as string),
        })
        result = await service.readFeeds({
          writerUid: login_user_uid,
        })
        LOGGER.info(`[@api/rest-controller] query-get-feeds |login-user-unread-feeds| ${(batchSize as string) ?? ''} from '${login_user_uid}' `)
        break
      case LOGIN_USER_RECENT_POSTS:
        result = await service.readRecentPosts({ userUid: login_user_uid })
        LOGGER.info(`[@api/rest-controller] query-get-feeds |login-user-recent-posts| '${login_user_uid}' `)
        break
      case SELECT_USER_RECENT_POSTS:
        result = await service.readRecentPosts({
          userUid: httpRequest.query.userUid as string,
        })
        LOGGER.info(`[@api/rest-controller] query-get-feeds |select-user-recent-posts| '${login_user_uid}' `)
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
