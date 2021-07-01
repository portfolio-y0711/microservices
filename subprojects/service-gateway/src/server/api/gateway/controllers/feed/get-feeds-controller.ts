import { IHttpResponse } from '@gateway/typings'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'

export const GetFeeds
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { login_user_uid } = httpRequest
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')
            const result
                = await circuitBreaker.invokeService({
                    baseURL,
                    url: '/api/feeds',
                    method: 'GET',
                    data: {
                        login_user_uid
                    },
                    params: {
                        ...httpRequest.query
                    }
                })
            const status = 200
            const httpResponse: IHttpResponse = {
                statusCode: status,
                body: result,
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }
