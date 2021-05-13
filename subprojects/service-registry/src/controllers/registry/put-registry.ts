import { IServiceRegistry } from '@registry/services/registry'
import { Request } from 'express'
import { IHttpResponse } from '@registry/typings'

export { StatusInfoController } from './status-info-controller'

export const Put
    = (serviceRegistry: IServiceRegistry) => {
        return (req: Request): IHttpResponse => {
            const { servicename, serviceversion, serviceport } = req.query

            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const serviceip = req.socket.remoteAddress.includes('::') ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress;

            const serviceKey
                = serviceRegistry
                    .register(servicename as string,
                        serviceversion as string,
                        serviceip,
                        parseInt(serviceport as string))

            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: {
                    serviceKey
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return httpResponse
        }
    }