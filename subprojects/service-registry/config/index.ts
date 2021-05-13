import bunyan from 'bunyan'
import sess from 'express-session'
import cors from 'cors'

import { IService } from '@registry/services/registry'
import { ITokenConfig } from './server'
import { getLogger} from './server'
import { cors_ } from './server'
import { env } from './server'
import { session } from './server'
import { token } from './server'
import { default as registry } from './registry'

export interface IConfig {
    server: {
        port: number,
        log: () => bunyan,
        cors_: cors.CorsOptions,
        session: sess.SessionOptions,
        token: ITokenConfig,
    },
    registry: {
        log: () => bunyan,
        config: { timeout: number },
        services: Map<string, IService>
    }
}

export default {
    server: {
        // secret: env.SECRET,
        port: env.PORT,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        log: () => getLogger('@micro/service-registry', '1.0.0', 'debug'),
        cors_,
        session,
        token
    },
    registry
}