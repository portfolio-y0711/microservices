import express from 'express'
import { Request } from 'express'
import { ICircuitBreaker } from '@gateway/services/circuit'
import { IServiceFinder } from '@gateway/services/finder'

export const GetBaseurl
    = ({ serviceFinder, circuitBreaker }: { serviceFinder: IServiceFinder, circuitBreaker: ICircuitBreaker }) => {
        return async (_: express.Request, res: express.Response): Promise<void> => {
            const domain = process.env.DOMAIN
            await new Promise(res => setTimeout(res, 0))
            res.json({
                baseUrl: domain ? domain + ':8000' : 'http://localhost:8000'
            })
            return
        }
    }
