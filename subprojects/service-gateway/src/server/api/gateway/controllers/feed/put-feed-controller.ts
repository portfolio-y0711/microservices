import { IHttpResponse } from '@gateway/typings'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'

export const PutFeed
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { feedUid } = httpRequest.params
            const { login_user_uid } = httpRequest
            const { commandType } = httpRequest.query

            const baseURL = await serviceFinder
                                .getServiceUrl('@micro/service-api', '1.0.0')
            const result 
                = await circuitBreaker.invokeService({
                    baseURL,
                    url: `/api/feeds/${feedUid}`,
                    method: 'PUT',
                    data: {
                        login_user_uid,
                    },
                    params: {
                        commandType
                    }
                })

            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: result,
            }
            // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }

