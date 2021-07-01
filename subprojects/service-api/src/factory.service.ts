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
  dbConn: IDBConnector,
): [IUserQueryService, IUserCmdService] => {
  const userDatabase = UserDatabase(dbConn)
  const userQueryService = UserQueryService(userDatabase)
  const userCmdService = UserCmdService(userDatabase)
  return [userQueryService, userCmdService]
}

export const createFeedService = (
  dbConnector: IDBConnector,
): [IFeedQueryService, IFeedCmdService] => {
  const feedDatabase = FeedDatabase(dbConnector)
  const feedQueryService = FeedQueryService(feedDatabase)
  const feedCmdService = FeedCmdService(feedDatabase)
  return [feedQueryService, feedCmdService]
}
