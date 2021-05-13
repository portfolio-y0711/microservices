import express from 'express'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/services/circuit'
import { IServiceFinder } from '@gateway/services/finder'

export const GetHome
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (_: express.Request, res: express.Response): Promise<void> => {
            const baseURL = await serviceFinder.getServiceUrl('@micro/service-front', '1.0.0')
            const result = await circuitBreaker.invokeService({
                baseURL,
                url: '/',
                method: 'GET'
            })
            res.send(result)
            return
            // console.log(result)
            // res.redirect(baseURL)
            // return 
        }
    }
