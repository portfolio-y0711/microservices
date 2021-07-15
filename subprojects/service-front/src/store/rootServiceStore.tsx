import { createContext } from 'react'
import { ISocketChatService } from '../socket/opertation/chat/SocketService'

import { api } from '../db/api'
import createApiChatService from 'db/services/chat/index'
import { IChatService } from '../db/services/chat/index'

import { SocketConnector } from '../socket/connection'
import createSocketChatService from 'socket/opertation/chat/SocketService'

import createSocketFeedService from 'socket/opertation/feeds/SocketService'
import { ISocketFeedService } from 'socket/opertation/feeds/SocketService'

import createSocketUserService from 'socket/opertation/users/SocketService'
import { ISocketUserService } from 'socket/opertation/users/SocketService'

type RootServiceType = {
  socketChatService: ISocketChatService
  apiChatService: IChatService
  socketFeedService: ISocketFeedService
  socketUserService: ISocketUserService
}

export const RootServiceContext = createContext<RootServiceType>(null)

const ServicesProvider = ({ children }) => {
  const connector = new SocketConnector({})
  const socketChatService = createSocketChatService(connector)
  const apiChatService = createApiChatService(api)

  const socketFeedService = createSocketFeedService(connector)
  const socketUserService = createSocketUserService(connector)

  return (
    <RootServiceContext.Provider
      value={{
        socketChatService,
        socketUserService,
        apiChatService,
        socketFeedService,
      }}
    >
      {children}
    </RootServiceContext.Provider>
  )
}

export default ServicesProvider
