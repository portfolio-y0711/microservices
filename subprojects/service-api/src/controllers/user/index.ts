import { NextFunction, Request, Response } from 'express'

import { IUserService } from '@feed/services/user'
import { AsyncHandler } from '../async.handler'
import { GetUsers } from './controllers'
import { PutUser } from './controllers'
import { GetUser } from './controllers'

export interface IUserController {
    getUsers: (req: Request, res: Response, next: NextFunction) => void
    getUser: (req: Request, res: Response, next: NextFunction) => void
    putUser: (req: Request, res: Response, next: NextFunction) => void
}


export const UserController
    = (service: IUserService): IUserController => {
        const getUsers = AsyncHandler(GetUsers(service))
        const getUser = AsyncHandler(GetUser(service))
        const putUser = AsyncHandler(PutUser(service))
        return {
            getUsers,
            getUser,
            putUser,
        }
    }