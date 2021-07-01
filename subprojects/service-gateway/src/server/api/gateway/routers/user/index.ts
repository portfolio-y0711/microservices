import { RequestHandler, Router } from 'express'

import { UserController } from '@gateway/server/api/gateway/controllers'
import { authMiddleware } from '@gateway/middlewares'
import { UserRouter } from './router'
import { default as config } from '@config/index'
import { ServiceFinder } from '@gateway/server/api/gateway/services'
import { CircuitBreaker } from '@gateway/server/api/gateway/services'
import { createCircuitBreakerStore } from '@gateway/server/api/gateway/services/circuit'

export const createUserRouter
    = function (authMiddleware: RequestHandler) {
        return (): Router => {
            const router = Router()
            const serviceFinder = ServiceFinder(config)
            const circuitBreakerStore = createCircuitBreakerStore()
            const circuitBreaker = CircuitBreaker({ config: config.circuit, store: circuitBreakerStore })
            const userController = UserController({ serviceFinder, circuitBreaker })
            const userRouter = UserRouter(userController, authMiddleware)
            router.use(userRouter)

            return router
        }
    }


const router = createUserRouter(authMiddleware)

export default router
