/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { getLogger } from '../../config/logger'
import { IHttpResponse } from '@gateway/typings'

const log = getLogger('controller', 'auth', 'debug')

export const AsyncHandler
    = (promisify: (_: any) => Promise<IHttpResponse>) => {
        return (req: Request, res: Response, _: NextFunction): void => {
            const httpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
                session: req.session,
                login_user_uid: req.login_user_uid
            }

            promisify(httpRequest).then(httpResponse => {

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
            }).catch(e => {
                log.error(e)
                res.sendStatus(500)
            })
        }
    }