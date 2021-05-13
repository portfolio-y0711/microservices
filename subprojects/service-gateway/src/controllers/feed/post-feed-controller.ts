import { IHttpResponse } from '@gateway/typings'
import { Request } from 'express'
import { IServiceFinder } from '@gateway/services/finder'
import { ICircuitBreaker } from '@gateway/services/circuit'

export const PostFeed
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { msg } = httpRequest.body
            const { login_user_uid } = httpRequest

            const baseURL = await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')
            const response = await circuitBreaker.invokeService({
                baseURL,
                url: '/api/feeds',
                method: 'POST',
                data: {
                    login_user_uid,
                    msg
                }
            })
            const status = 200
            const httpResponse: IHttpResponse = {
                statusCode: status,
                body: response,
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }

