import { createContext } from 'react'

import { FeedsModelType } from './models/feeds/model.feeds'
import { AuthModelType } from './models/auth/model.auth'
import { ChatModelType } from './models/chat/model.chat'
import { UsersModelType } from './models/users/model.users'
import { UIModelType } from './models/ui/model.ui'

import createAuthModel from './models/auth/AuthModel'
import createFeedsModel from './models/feeds/FeedsModel'
import createUsersModel from './models/users/UsersModel'
import createUIModel from './models/ui/UIModel'
import createChatModel from './models/chat/ChatModel'

import createFeedsService from 'db/services/feeds'
import createUsersService from 'db/services/users'
import createAuthService from 'db/services/auth'
import createUIService from 'db/services/ui'

import { api } from 'db/api'

type RootModelType = {
  chatModel: ChatModelType
  feedsModel: FeedsModelType
  authModel: AuthModelType
  usersModel: UsersModelType
  uiModel: UIModelType
}

export const RootContext = createContext<RootModelType>(null)

const ModelsProvider = ({ children }) => {
  const feedsService = createFeedsService(api)
  const feedsModel: FeedsModelType = createFeedsModel(feedsService)

  const usersService = createUsersService(api)
  const usersModel: UsersModelType = createUsersModel(usersService)

  const authService = createAuthService(api)
  const authModel: AuthModelType = createAuthModel(authService)

  const uiService = createUIService(api)
  const uiModel: UIModelType = createUIModel(uiService)

  const chatModel: ChatModelType = createChatModel()

  return (
    <RootContext.Provider
      value={{
        feedsModel,
        usersModel,
        authModel,
        chatModel,
        uiModel,
      }}
    >
      {children}
    </RootContext.Provider>
  )
}

export default ModelsProvider
