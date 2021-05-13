/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { getLogger } from '@config/server/logger'
import { IHttpResponse } from '@registry/typings'

const log = getLogger('controller', 'auth', 'debug')

export const ResponseHandler
    = (requestHandler: (_: any) => IHttpResponse) => {
        return (req: Request, res: Response, _: NextFunction): void => {
            const httpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
                session: req.session,
                socket: req.socket,
                login_user_uid: req.login_user_uid
            }

            const httpResponse = requestHandler(httpRequest)

            if (httpResponse.Location) {
                res.set('Location', httpResponse.Location)
            }
            if (httpResponse.cookie) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                log.debug(`${httpResponse.cookie}`)
                res.setHeader('Set-Cookie', [httpResponse.cookie])
            }
            res.type('json')
            res.status(httpResponse.statusCode)
                .send(httpResponse.body)
            return
        }
    }