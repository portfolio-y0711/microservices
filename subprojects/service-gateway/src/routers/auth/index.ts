import { RequestHandler, Router } from 'express'

import { IDBConnection } from '@gateway/database'
import { AuthDatabase } from '@gateway/database'
import { AuthService } from '@gateway/services'
import { AuthController } from '@gateway/controllers'
import { authMiddleware } from '@gateway/middlewares'
import { AuthRouter } from './router'

export const createAuthRouter
    = (authMiddleware: RequestHandler) => {
        return (conn: IDBConnection): Router => {

            const router = Router()
            const authDB = AuthDatabase(conn)
            const authService = AuthService({ authDB })
            const authController = AuthController(authService)
            const authRouter = AuthRouter(authController, authMiddleware)

            router.use(authRouter)

            return router
        }
    }

const router = createAuthRouter(authMiddleware)

export default router
