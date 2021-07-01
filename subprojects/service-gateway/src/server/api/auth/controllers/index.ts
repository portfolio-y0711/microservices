import { NextFunction, Request, Response } from 'express'
import { IAuthService } from '@gateway/server/api/auth/services'

import { LoginController } from './controllers'
import { LogoutController } from './controllers'
import { StatusInfoController } from './controllers'
import { authTools } from '@gateway/server/api/auth/services/util'
import { AsyncHandler } from '@gateway/server/api/gateway/controllers/async.handler'

export interface IAuthController {
    login: (req: Request, res: Response, next: NextFunction) => void
    logout: (req: Request, res: Response, next: NextFunction) => void
    status: (req: Request, res: Response, next: NextFunction) => void
}

export const AuthController
    = (service: IAuthService): IAuthController => {
        const login = AsyncHandler(LoginController(service, authTools))
        const logout = AsyncHandler(LogoutController())
        const status = AsyncHandler(StatusInfoController())
        return {
            login,
            logout,
            status,
        }
    }
