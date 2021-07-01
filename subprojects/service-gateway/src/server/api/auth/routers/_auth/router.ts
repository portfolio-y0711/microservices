import { RequestHandler, Router } from 'express'
import { IAuthController } from '@gateway/server/api/auth/controllers'
import { Cors } from '@gateway/middlewares'

export const AuthRouter
    = (controller: IAuthController,
        authMiddleware: RequestHandler): Router => {

        const router = Router()
        router
            .get('/health', controller.status)
            .post('/auth/login', Cors, authMiddleware, controller.login)
            .post('/auth/logout', Cors, controller.logout)
        return router
    }
