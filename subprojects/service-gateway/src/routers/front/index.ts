import { Router } from 'express'
import { FrontRouter } from './router'
export { FrontRouter } from './router'
import { FrontController } from '@gateway/controllers'
import { default as config } from '@config/index'

// import { MockServiceFinder } from '@gateway/services/finder'
import { ServiceFinder } from '@gateway/services/finder'
import { CircuitBreaker } from '@gateway/services/circuit'
import { createCircuitBreakerStore } from '@gateway/services/circuit/create-store'


export const createFrontRouter
    = () => {
        return (): Router => {
            const router = Router()
            // const serviceFinder = MockServiceFinder(config)
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

