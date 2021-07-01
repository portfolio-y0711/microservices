import { IFeedCmdService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { Request } from 'express'
import { IFeedCommandType } from '@feed/data/database/typeorm/vo/feed-command'

export const PutFeed = (service: IFeedCmdService) => {
  return async (httpRequest: Request): Promise<IHttpResponse> => {
    const { commandType } = httpRequest.query

    let result: any
    let statusCode: number

    const { feedUid } = httpRequest.params
    const { login_user_uid } = httpRequest.body

    result = false

    // const type = createFeedCommandType({ ...command })

    switch (commandType) {
      case IFeedCommandType.PUT_LIKE_ON_FEED:
        result = await service.thumbsUpFeed({
          feedUid: feedUid,
          likerUid: login_user_uid,
        })
        break
      case IFeedCommandType.PUT_DISLIKE_ON_FEED:
        result = await service.thumbsDownFeed({
          feedUid: feedUid,
          dislikerUid: login_user_uid,
        })
        break
      case IFeedCommandType.NO_SUCH_COMMAND:
        statusCode = 500
        result = {
          msg: 'no such command',
        }
        break
    }

    const httpResponse: IHttpResponse = {
      statusCode: 200,
      body: {
        msg: 'updated',
      },
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return httpResponse
  }
}
