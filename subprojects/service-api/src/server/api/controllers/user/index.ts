import { NextFunction, Request, Response } from 'express'

import { IUserQueryService } from '@feed/services'
import { AsyncHandler } from '../async.handler'
import { GetUsers } from './controllers'
import { GetUser } from './controllers'

export interface IUserController {
  getUsers: (req: Request, res: Response, next: NextFunction) => void
  getUser: (req: Request, res: Response, next: NextFunction) => void
}

export const UserController = (service: IUserQueryService): IUserController => {
  const getUsers = AsyncHandler(GetUsers(service))
  const getUser = AsyncHandler(GetUser(service))
  return {
    getUsers,
    getUser,
  }
}
