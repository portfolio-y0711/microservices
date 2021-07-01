import { Request } from 'express'
import { IUserQueryService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'

import { User } from '@feed/data/database'
import { IUserQueryType } from '@feed/data/database'

export const GetUser = (service: IUserQueryService) => {
  return async (httpRequest: Request): Promise<IHttpResponse> => {
    const { userUid } = httpRequest.params
    const { queryType: _queryType } = httpRequest.query

    const { LOGIN_USER_PROFILE, SELECT_USER_PROFILE } = IUserQueryType

    let result: User
    switch (_queryType) {
      case LOGIN_USER_PROFILE:
        result = await service.fetchLoginUserInfo(userUid)
        break
      case SELECT_USER_PROFILE:
        result = await service.fetchUserInfo(userUid)
        break
    }

    const httpResponse = {
      statusCode: 200,
      body: result,
    }
    return httpResponse
  }
}
