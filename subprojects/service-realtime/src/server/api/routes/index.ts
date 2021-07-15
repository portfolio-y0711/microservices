import express, { Router, Request, Response } from 'express'
import { IChatStore } from '@realtime/server/api'

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
    .get('/chatMessages', (_: Request, response: Response) => {
      const messages = chatStore.getMessages()
      response.json(messages)
    })
  return router
}
