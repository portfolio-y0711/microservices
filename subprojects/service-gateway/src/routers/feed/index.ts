import { Router } from 'express'
import { RequestHandler } from 'express'
import { FeedRouter } from './router'
export { FeedRouter } from './router'
import { authMiddleware } from '@gateway/middlewares'
import { FeedController } from '@gateway/controllers'
import { default as config } from '@config/index'

// import { MockServiceFinder } from '@gateway/services/finder'
import { ServiceFinder } from '@gateway/services/finder'
import { CircuitBreaker } from '@gateway/services/circuit'
import { createCircuitBreakerStore } from '@gateway/services/circuit/create-store'


export const createFeedRouter
    = (authMiddleware: RequestHandler) => {
        return (): Router => {
            const router = Router()
            // const serviceFinder = MockServiceFinder(config)
            const serviceFinder = ServiceFinder(config)
            const circuitBreakerStore = createCircuitBreakerStore()
            const circuitBreaker = CircuitBreaker({ config: config.circuit, store: circuitBreakerStore } )
            const feedController = FeedController({ circuitBreaker, serviceFinder})
            const feedRouter = FeedRouter(feedController, authMiddleware)
            router.use(feedRouter)

            return router
        }
    }

const router = createFeedRouter(authMiddleware)

export default router

