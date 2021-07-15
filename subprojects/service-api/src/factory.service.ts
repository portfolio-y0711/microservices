import { IDBConnector } from './data/database/typeorm/connection/index'
import { UserDatabase } from '@feed/data/database'
import {
  IFeedCmdService,
  IFeedQueryService,
  IUserQueryService,
  UserQueryService,
} from '@feed/services'
import { FeedDatabase } from '@feed/data/database'
import { FeedQueryService } from '@feed/services'
import { UserCmdService } from '@feed/services'
import { FeedCmdService } from '@feed/services'
import { IUserCmdService } from './services/cmd-service/user/index'

export const createUserService = (
  dbConnector: IDBConnector,
): [IUserQueryService, IUserCmdService] => {
  const userDatabase = UserDatabase(dbConnector)
  const userQueryService = UserQueryService(userDatabase)
  const userCmdService = UserCmdService(userDatabase)
  return [userQueryService, userCmdService]
}

export const createFeedService = (
  dbConnector: IDBConnector,
): [IFeedQueryService, IFeedCmdService] => {
  const feedDatabase = FeedDatabase(dbConnector)
  const userDatabase = UserDatabase(dbConnector)
  const feedQueryService = FeedQueryService(feedDatabase)
  const feedCmdService = FeedCmdService({
    feedDB: feedDatabase,
    userDB: userDatabase,
  })
  return [feedQueryService, feedCmdService]
}
