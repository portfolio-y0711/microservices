import express from 'express'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/services/circuit'
import { IServiceFinder } from '@gateway/services/finder'
import { Readable } from 'stream'

export const GetImg
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (req: express.Request, res: express.Response): Promise<void> => {
            const { filename } = req.params
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-front', '1.0.0')
            const result = await circuitBreaker.invokeService({
                baseURL,
                url: '/img/' + filename,
                method: 'GET',
                responseType: 'stream'
            })
            const readable: Readable = result
            res.setHeader('content-type', 'image/png');
            readable.pipe(res)
            return
        }
    }
