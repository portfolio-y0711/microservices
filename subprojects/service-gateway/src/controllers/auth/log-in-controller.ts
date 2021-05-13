import { Request } from 'express'
import { IAuthService } from '@gateway/services'
import { IAuthTools, IHttpResponse } from '@gateway/typings'

export const LoginController
    = (service: IAuthService, tools: IAuthTools) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const { authenticate, tokenizer, cookieCreator } = tools

            // case 1
            if (httpRequest.login_user_uid) {
                // no need to authenticate

                return {
                    statusCode: 200,
                    body: { message: 'logined'}
                }
            }

            // case 2
            let userUid: string,
                pass: string
            try {
                ({ body: { userUid, pass } } = httpRequest)

                if ((userUid === 'undefined') || (userUid === undefined) || (pass === 'undefined') || (pass === undefined)) {
                    console.log('No userId and Password')
                    throw Error()
                }
            } catch (e) {
                return {
                    statusCode: 401,
                    body: {
                        message: 'not authorized'
                    }
                }
            }

            ({ body: { userUid, pass } } = httpRequest)
            
            const { password: saved_pass } = await service.getUserPass(userUid)

            const isAuthenticated = await authenticate({ saved: saved_pass, input: pass })

            if (!isAuthenticated) {
                return {
                    statusCode: 402,
                    body: {
                        message: 'not authenticated'
                    }
                }
            } else {
                const token = tokenizer.sign({ userUid: userUid })
                const cookieHeader = cookieCreator(token)
                return {
                    statusCode: 200,
                    cookie: cookieHeader,
                    body: { message: 'logined' }
                }
            }
        }
    }
