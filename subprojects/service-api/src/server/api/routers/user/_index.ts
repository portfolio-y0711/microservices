import { Router } from 'express'

import { IDBConnector } from '@feed/data/database'
import { UserDatabase } from '@feed/data/database'
import { UserQueryService } from '@feed/services'
import { UserController } from '@feed/server/api/controllers'
import { UserRouter } from './router'

export const createUserRouter = function () {
  return (conn: IDBConnector): Router => {
    const router = Router()
    const userDatabase = UserDatabase(conn)
    const userService = UserQueryService(userDatabase)
    const userController = UserController(userService)
    const userRouter = UserRouter(userController)

    router.use(userRouter)

    return router
  }
}

const router = createUserRouter()

export default router
