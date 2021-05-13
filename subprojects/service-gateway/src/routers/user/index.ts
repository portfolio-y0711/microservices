import { RequestHandler, Router } from 'express'

import { UserController } from '@gateway/controllers'
import { authMiddleware } from '@gateway/middlewares'
import { UserRouter } from './router'
import { default as config } from '@config/index'
import { CircuitBreaker, ServiceFinder } from '@gateway/services'
// import { MockServiceFinder } from '@gateway/services'
import { createCircuitBreakerStore } from '@gateway/services/circuit/create-store'

export const createUserRouter
    = function (authMiddleware: RequestHandler) {
        return (): Router => {
            const router = Router()
            // const serviceFinder = MockServiceFinder(config)
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


// export const createUserRouter
//     = function (authMiddleware: RequestHandler) {
//         return (conn: IDBConnection): Router => {

//             const router = Router()
//             const userDatabase = UserDatabase(conn)
//             const userService = UserService(userDatabase)
//             const userController = UserController(userService)
//             const userRouter = UserRouter(userController, authMiddleware)

//             router.use(userRouter)

//             return router
//         }
//     }


// const router = createUserRouter(authMiddleware)

// export default router
