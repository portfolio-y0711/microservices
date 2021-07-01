import { Router } from 'express'
import { ChatRouter } from './router'
import { ChatController } from '@gateway/server/api/gateway/controllers'
import { default as config } from '@config/index'

import { ServiceFinder } from '@gateway/server/api/gateway/services'
import { CircuitBreaker } from '@gateway/server/api/gateway/services'
import { createCircuitBreakerStore } from '@gateway/server/api/gateway/services/circuit'


export const createChatRouter
    = () => {
        return (): Router => {
            const router = Router()
            const serviceFinder = ServiceFinder(config)
            const circuitBreakerStore = createCircuitBreakerStore()
            const circuitBreaker = CircuitBreaker({ config: config.circuit, store: circuitBreakerStore } )
            const chatController = ChatController({ circuitBreaker, serviceFinder})
            const chatRouter = ChatRouter(chatController)
            router.use(chatRouter)

            return router
        }
    }

const router = createChatRouter()

export default router

