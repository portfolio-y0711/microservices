import express from 'express'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'

export const GetCss
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (req: express.Request, res: express.Response): Promise<void> => {
            const { filename } = req.params
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-front', '1.0.0')
            const result = await circuitBreaker.invokeService({
                baseURL,
                url: '/static/css/' + filename,
                method: 'GET',
            })
            res.setHeader('content-type', 'text/css');
            res.send(result)
            return
        }
    }
