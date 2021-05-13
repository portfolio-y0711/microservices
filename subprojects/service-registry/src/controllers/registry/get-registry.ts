import { IServiceRegistry } from '@registry/services/registry'
import { Request } from 'express'
import { IHttpResponse } from '@registry/typings'

export const Get
    = (serviceRegistry: IServiceRegistry) => {
        return (req: Request): IHttpResponse => {
            const { servicename, serviceversion } = req.query
            const service = serviceRegistry
                .get(servicename as string,
                    serviceversion as string)

            if (!service) {
                return {
                    statusCode: 404,
                    body: {
                        message: 'Service not found'
                    }
                }
            }
            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: {
                    service
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }