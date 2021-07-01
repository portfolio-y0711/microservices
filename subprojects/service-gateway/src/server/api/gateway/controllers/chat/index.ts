import { NextFunction, Request, Response } from 'express'

import { ICircuitBreaker } from '@gateway/server/api/gateway/services/circuit'
import { IServiceFinder } from '@gateway/server/api/gateway/services/finder'
import { GetChatUsers } from './get-chat-users'
import { AsyncHandler } from '../async.handler'
import { GetChatServerURL } from './get-chat-server-url'

export interface IChatController {
    getChatUsers: (req: Request, res: Response, next: NextFunction) => void
    getChatServerURL: (req: Request, res: Response, next: NextFunction) => void
}

export const ChatController
    = ({ circuitBreaker, serviceFinder }: { circuitBreaker: ICircuitBreaker, serviceFinder: IServiceFinder }): IChatController => {
        const getChatUsers = AsyncHandler(GetChatUsers({ circuitBreaker, serviceFinder }))
        const getChatServerURL = AsyncHandler(GetChatServerURL({ circuitBreaker, serviceFinder }))
        return {
            getChatUsers,
            getChatServerURL,
        }
    }
