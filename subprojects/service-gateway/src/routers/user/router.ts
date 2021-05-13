import { RequestHandler, Router } from 'express'
import { IUserController } from '@gateway/controllers'
import { Cors } from '@gateway/middlewares'

export const UserRouter
    = (controller: IUserController,
        authMiddleware: RequestHandler): Router => {

        const router = Router()

        router
            .get('/users', Cors, controller.getUsers)
            .get('/users/:userUid', Cors, authMiddleware, controller.getUser)
            .put('/users/:userUid', Cors, authMiddleware, controller.putUser)
        return router
    }
