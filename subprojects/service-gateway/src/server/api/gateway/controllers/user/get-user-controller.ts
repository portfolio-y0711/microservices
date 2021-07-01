import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'
import { IHttpResponse } from '@gateway/typings'
import { createUserQueryType, IUserQueryType } from '@gateway/data/database/typeorm/vo'

export const GetUser
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { login_user_uid } = httpRequest
            const { userUid } = httpRequest.params
            const { query: _query, target } = httpRequest.query

            const query = createUserQueryType({ query: _query, target })
            
            const { LOGIN_USER_PROFILE, SELECT_USER_PROFILE } = IUserQueryType
            let url: string

            switch (query) {
                case LOGIN_USER_PROFILE:
                    url = `/api/users/${login_user_uid}`
                    break
                case SELECT_USER_PROFILE:
                    url = `/api/users/${userUid}`
                    break
            }

            const baseURL = (await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')) as any

            const result = await circuitBreaker.invokeService({
                baseURL,
                url,
                method: 'GET',
                params: {
                    queryType: query
                }
            })

            const httpResponse = {
                statusCode: 200,
                body: result
            }
            return httpResponse
        }
    }
