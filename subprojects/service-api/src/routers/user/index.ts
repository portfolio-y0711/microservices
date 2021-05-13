import { Router } from 'express'

import { IDBConnection } from '@feed/database'
import { UserDatabase } from '@feed/database'
import { UserService } from '@feed/services'
import { UserController } from '@feed/controllers'
import { UserRouter } from './router'

export const createUserRouter
    = function () {
        return (conn: IDBConnection): Router => {

            const router = Router()
            const userDatabase = UserDatabase(conn)
            const userService = UserService(userDatabase)
            const userController = UserController(userService)
            const userRouter = UserRouter(userController)

            router.use(userRouter)

            return router
        }
    }


const router = createUserRouter()

export default router
