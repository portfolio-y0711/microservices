import express, { Router, Request, Response } from 'express'
import { IChatStore } from '@realtime/data/api'

export const chatRouter = (chatStore: IChatStore) => {
  const router = Router()

  router
    .get('/health', (_: express.Request, res: express.Response) => {
      res.json({ status: 'up' })
    })
    .get('/chatUsers', (_: Request, response: Response) => {
      const users = chatStore.getUsers()
      response.json(users)
    })
  return router
}
