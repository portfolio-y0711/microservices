import { Router } from 'express'
import { IChatController } from '@gateway/server/api/gateway/controllers/chat'
import { Cors } from '@gateway/middlewares'

export const ChatRouter
    = (controller: IChatController): Router => {

        const router = Router()
        router
            .get('/chatUsers', Cors, controller.getChatUsers) 
            .get('/chatServerURL', Cors, controller.getChatServerURL) 
        return router
    }
