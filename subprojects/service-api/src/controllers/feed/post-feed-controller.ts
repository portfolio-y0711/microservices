import { IFeedService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { Request } from 'express'

export const PostFeed
    = (service: IFeedService) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { msg } = httpRequest.body
            const { login_user_uid } = httpRequest.body

            let result: any
            const isPosted = await service.publishFeed({ writerUid: login_user_uid, msg })
            if (isPosted) result = { msg: 'posted'}

            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: result,
            }
            return httpResponse
        }
    }