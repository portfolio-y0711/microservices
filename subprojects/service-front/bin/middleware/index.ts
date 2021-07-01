import express, { Request, Response, NextFunction, RequestHandler } from 'express'

export const Cors = (req: Request, res: Response, next: NextFunction): any => {
  // const whitelist = ['http://localhost:xxxx', 'http://localhost:yyyy']
  const origin = req.header('Origin') as string
  if (origin !== '' && origin !== undefined) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  next()
  return
}
