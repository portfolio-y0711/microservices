import { Router } from 'express'
import { IUserController } from '@feed/server/api/controllers'

export const UserRouter = (controller: IUserController): Router => {
  const router = Router()

  router
    .get('/users', controller.getUsers)
    .get('/users/:userUid', controller.getUser)
  // .put('/users/:userUid', controller.putUser)
  return router
}
