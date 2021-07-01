import { IHttpResponse } from '@gateway/typings'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'

export const GetChatServerURL
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (_: Request): Promise<IHttpResponse> => {
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-realtime', '1.0.0')
            const status = 200
            const httpResponse: IHttpResponse = {
                statusCode: status,
                body: { url: baseURL },
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }
