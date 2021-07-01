import { Request } from 'express'
import { IUserQueryService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'

export const GetUsers = (service: IUserQueryService) => {
  return async (_: Request): Promise<IHttpResponse> => {
    const result = await service.fetchAll()

    const httpResponse = {
      statusCode: 200,
      body: result,
    }
    return httpResponse
  }
}
