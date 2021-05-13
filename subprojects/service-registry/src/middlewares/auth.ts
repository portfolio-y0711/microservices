import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { IVerificationResponse } from '@registry/typings'


export const authMiddleware: RequestHandler
  = (request: Request, _: Response, next: NextFunction): void => {
    const cookies = request.cookies
    if (cookies && cookies.Authorization) {
      // log.debug('received cookie')
      let verificationResponse
      try {
        verificationResponse = jwt.verify(cookies.Authorization, 'abcdefg') as IVerificationResponse
        const _login_user_uid = verificationResponse.userUid as string
        if (_login_user_uid) {
          // log.info(`user verified => user: ${_login_user_uid}`)
          request.login_user_uid = _login_user_uid
          next()
        } else {
          next()
        }
      } catch (e) {
        throw Error('authrization failed')
      }
    } else {
      next()
    }
  }
