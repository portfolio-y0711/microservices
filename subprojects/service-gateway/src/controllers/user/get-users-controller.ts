import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/services'
import { IServiceFinder } from '@gateway/services'
import { IHttpResponse } from '@gateway/typings'

export const GetUsers
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (_: Request): Promise<IHttpResponse> => {
            const baseURL = (await serviceFinder.getServiceUrl('@micro/service-api', '1.0.0')) as any

            const result = await circuitBreaker.invokeService({
                baseURL,
                url: '/api/users',
                method: 'GET'
            })
            const httpResponse = {
                statusCode: 200,
                body: result
            }
            return httpResponse
        }
    }