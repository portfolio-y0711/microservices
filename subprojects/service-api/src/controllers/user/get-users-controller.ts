import { Request } from 'express'
import { IUserService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'

export const GetUsers
    = (service: IUserService) => {
        return async (_: Request): Promise<IHttpResponse> => {
            const result = await service.fetchAll()

            const httpResponse = {
                statusCode: 200,
                body: result
            }
            return httpResponse
        }
    }
