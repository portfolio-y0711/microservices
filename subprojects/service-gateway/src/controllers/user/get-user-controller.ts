import axios from 'axios'
import { Request } from 'express'
import { ICircuitBreaker, IServiceFinder } from '@gateway/services'
import { IHttpResponse } from '@gateway/typings'
import { createUserQueryType, IUserQueryType } from '@gateway/database/typeorm/vo'

export const GetUser
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const command = httpRequest.query
            const { login_user_uid } = httpRequest
            const { userUid } = httpRequest.params

            const queryType = createUserQueryType(command)
            const { LOGIN_USER_PROFILE, SELECT_USER_PROFILE } = IUserQueryType
            let url: string

            switch (queryType) {
                case LOGIN_USER_PROFILE:
                    url = `/api/users/${login_user_uid}`
                    break
                case SELECT_USER_PROFILE:
                    url = `/api/users/${userUid}`
                    break
            }
            const baseURL = (await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')) as any

            const { status, data } = await axios({
                baseURL,
                url,
                method: 'GET',
                params: {
                    ...command
                }
            })

            const httpResponse = {
                statusCode: status,
                body: data
            }
            return httpResponse
        }
    }
