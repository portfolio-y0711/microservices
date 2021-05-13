import { Request } from 'express'
import { IUserService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { IUserQueryType, User } from '@feed/database'
import { createUserQueryType } from '@feed/database/typeorm/vo/user-query'

export const GetUser
    = (service: IUserService) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const command = httpRequest.query
            const { userUid } = httpRequest.params
            
            const { LOGIN_USER_PROFILE, SELECT_USER_PROFILE } = IUserQueryType

            const queryType = createUserQueryType(command)

            let result: User
            switch(queryType) {

                case LOGIN_USER_PROFILE:
                    result = await service.fetchLoginUserInfo(userUid)
                    break
                case SELECT_USER_PROFILE:
                    result = await service.fetchUserInfo(userUid)
                    break
            }

            const httpResponse = {
                statusCode: 200,
                body: result
            }
            return httpResponse
        }
    }