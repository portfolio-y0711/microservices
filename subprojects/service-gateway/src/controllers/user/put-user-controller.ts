import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/services'
import { IServiceFinder } from '@gateway/services'
import { IHttpResponse } from '@gateway/typings'

export const PutUser
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { userUid } = httpRequest.params
            const { login_user_uid } = httpRequest
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')
            const result = await circuitBreaker.invokeService({
                baseURL,
                url: `/api/users/${userUid}`,
                method: 'PUT',
                data: {
                    login_user_uid,
                },
                params: {
                    ...httpRequest.params,
                    ...httpRequest.query
                }
            })
            const httpResponse = {
                statusCode: 200,
                body: result      
            }
            return httpResponse
        }
    }