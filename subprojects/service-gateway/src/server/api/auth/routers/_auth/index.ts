import { RequestHandler, Router } from 'express'

import { IDBConnection } from '@gateway/data/database'
import { AuthDatabase } from '@gateway/data/database'
import { authMiddleware } from '@gateway/middlewares'
import { AuthController } from '@gateway/server/api/auth/controllers'
import { AuthRouter } from './router'
import { AuthService } from '@gateway/server/api/auth/services'

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
