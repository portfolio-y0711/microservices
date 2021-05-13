import { Request } from 'express'
import { IHttpResponse } from '@registry/typings'
import { nextTick } from '@micro/utils'

export const StatusInfoController
    = () => {
        return async (_: Request): Promise<IHttpResponse> => {
            await nextTick()
            return {
                statusCode: 200,
                body: {
                    status: 'up'
                }
            }
        }
    }