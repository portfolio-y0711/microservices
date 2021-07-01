import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../async.handler'
import { GetUsers } from './controllers'
import { GetUser } from './controllers'
import { PutUser } from './controllers'
import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'

export interface IUserController {
    getUsers: (req: Request, res: Response, next: NextFunction) => void
    getUser: (req: Request, res: Response, next: NextFunction) => void
    putUser: (req: Request, res: Response, next: NextFunction) => void
}


export const UserController
    = ({ circuitBreaker, serviceFinder }: { circuitBreaker: ICircuitBreaker, serviceFinder: IServiceFinder }): IUserController => {
        const getUsers = AsyncHandler(GetUsers({ circuitBreaker, serviceFinder }))
        const getUser = AsyncHandler(GetUser({ circuitBreaker, serviceFinder }))
        const putUser = AsyncHandler(PutUser({ circuitBreaker, serviceFinder }))
        return {
            getUsers,
            getUser,
            putUser,
        }
    }
