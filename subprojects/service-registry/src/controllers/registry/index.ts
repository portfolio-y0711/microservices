import { NextFunction, Request, Response } from 'express'
import { Delete, Get, Put, StatusInfoController } from './controllers'
import { AsyncHandler } from '../async.handler'
import { ResponseHandler } from '../response.handler'
import { IServiceRegistry } from '@registry/services/registry'

export interface IRegistryController {
    status: (req: Request, res: Response, next: NextFunction) => void
    put: (req: Request, res: Response, next: NextFunction) => void
    delete_: (req: Request, res: Response, next: NextFunction) => void
    get: (req: Request, res: Response, next: NextFunction) => void
}

export const RegistryController
    = (service: IServiceRegistry): IRegistryController => {
        const status = AsyncHandler(StatusInfoController())
        const put = ResponseHandler(Put(service))
        const delete_ = ResponseHandler(Delete(service))
        const get = ResponseHandler(Get(service))

        return {
            status,
            put,
            delete_,
            get,
        }
    }
