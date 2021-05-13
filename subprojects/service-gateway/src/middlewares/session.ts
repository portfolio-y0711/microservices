import { RequestHandler } from 'express'
import session from 'express-session'
import { IConfig } from '@config/index'

export const Session
    = (config: IConfig): RequestHandler => {
        return session(config.server.session)
    }