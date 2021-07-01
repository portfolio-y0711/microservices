import { Request } from 'express'
import { IHttpResponse } from '@gateway/typings'

export const LogoutController
    = () => async (_: Request): Promise<IHttpResponse> => {
        await new Promise(res => setTimeout(res, 0))
        return {
            statusCode: 200,
            cookie: `Authorization=1; Path=/; Max-Age=1`,
            body: {
                logginUser: undefined
            }
        }
    }