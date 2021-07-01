import { Router } from 'express'
import { FrontRouter } from './router'
export { FrontRouter } from './router'
import { FrontController } from '@gateway/server/api/gateway/controllers'
import { default as config } from '@config/index'

import { ServiceFinder } from '@gateway/server/api/gateway/services'
import { CircuitBreaker } from '@gateway/server/api/gateway/services'
import { createCircuitBreakerStore } from '@gateway/server/api/gateway/services/circuit'


export const createFrontRouter
    = () => {
        return (): Router => {
            const router = Router()
            const serviceFinder = ServiceFinder(config)
            const circuitBreakerStore = createCircuitBreakerStore()
            const circuitBreaker = CircuitBreaker({ config: config.circuit, store: circuitBreakerStore } )
            const frontController = FrontController({ circuitBreaker, serviceFinder})
            const frontRouter = FrontRouter(frontController)
            router.use(frontRouter)

            return router
        }
    }

const router = createFrontRouter()

export default router

