import { Router } from 'express'
import { RegistryRouter } from './router'
import { RegistryController } from '@registry/controllers'
import { ServiceRegistry } from '@registry/services/registry'
import { default as config } from '@config/index'


export const createRegistryRouter
    = () => {
        return (): Router => {
            const router = Router()
            const serviceRegistry = ServiceRegistry(config.registry)
            const registryController = RegistryController(serviceRegistry)
            const authRouter = RegistryRouter(registryController)

            router.use(authRouter)

            return router
        }
    }

const router = createRegistryRouter()

export default router
