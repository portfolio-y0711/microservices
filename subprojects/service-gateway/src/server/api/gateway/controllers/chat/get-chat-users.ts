import { IHttpResponse } from '@gateway/typings'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder} from '@gateway/server/api/gateway/services/finder'

export const GetChatUsers
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (_: Request): Promise<IHttpResponse> => {
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-realtime', '1.0.0')
            const result
                = await circuitBreaker.invokeService({
                    baseURL,
                    url: '/api/chatUsers',
                    method: 'GET'
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
