import { Router } from 'express'
import { default as RegistryRouter } from './registry'
export { RegistryRouter } from './registry/router'
export { createRegistryRouter } from './registry/index'

export default function (): Router {
    const router = Router()
    router
        .use('/api', RegistryRouter())
    return router
}
