import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'
import { IHttpResponse } from '@gateway/typings'
import { createUserCommandType } from '@gateway/data/database/typeorm/vo'

export const PutUser
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { userUid } = httpRequest.params
            const { command, subject } = httpRequest.query
            const { login_user_uid } = httpRequest

            const baseURL
                = await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')

            const type = createUserCommandType({ command, subject, friend: userUid })
                
            const result 
                = await circuitBreaker.invokeService({
                    baseURL,
                    url: `/api/users/${userUid}`,
                    method: 'PUT',
                    data: {
                        login_user_uid,
                    },
                    params: {
                        command: type
                    }
                })

            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: result      
            }
            return httpResponse
        }
    }