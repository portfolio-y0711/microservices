import { IRegistryController } from '@registry/controllers'
import { Router } from 'express'

export const RegistryRouter
    = (controller: IRegistryController): Router => {

        const router = Router()
        router
            .get('/health', controller.status)
            .put('/registries', controller.put)
            .delete('/registries', controller.delete_)
            .get('/registries', controller.get)
        return router
    }
