import { Request, Response, NextFunction, RequestHandler } from 'express'
import { IConfig } from '@config/index'

export const Logger = (config: IConfig) => {
  return (req: Request, res: Response, next: NextFunction): RequestHandler => {
    const log = config.server.log()
    log.info(`${req.method}: ${req.url}`)
    next()
    return
  }
}

export const ErrorLogger = (config: IConfig) => {
  return (
    error: any,
    _: Request,
    res: Response,
    __: NextFunction,
  ): RequestHandler => {
    const log = config.server.log()
    res.status(error.status || 500)
    log.error(error)
    res.json({
      error: {
        message: error.message,
      },
    })
    return
  }
}
