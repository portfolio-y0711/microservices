import { Router } from 'express'
import { RequestHandler } from 'express'
import { FeedRouter } from './router'
export { FeedRouter } from './router'
import { authMiddleware } from '@gateway/middlewares'
import { FeedController } from '@gateway/server/api/gateway/controllers'
import { default as config } from '@config/index'

import { ServiceFinder } from '@gateway/server/api/gateway/services'
import { CircuitBreaker } from '@gateway/server/api/gateway/services'
import { createCircuitBreakerStore } from '@gateway/server/api/gateway/services/circuit'


export const createFeedRouter
    = (authMiddleware: RequestHandler) => {
        return (): Router => {
            const router = Router()
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

