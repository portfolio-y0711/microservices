import { Router } from 'express'

import { IUserQueryService } from '@feed/services'
import { UserController } from '@feed/server/api/controllers'
import { UserRouter } from './router'

export const createUserRouter = function () {
  return (service: IUserQueryService): Router => {
    const router = Router()
    const userController = UserController(service)
    const userRouter = UserRouter(userController)

    router.use(userRouter)

    return router
  }
}

const router = createUserRouter()

export default router
