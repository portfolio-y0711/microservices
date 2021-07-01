import { IUser } from '@gateway/data/database/typeorm/entities'

declare module 'express-session' {
    interface SessionData {
      is_loggined: boolean
      loggin_user: IUser
    }
}

declare module 'express' {
  export interface Request {
    login_user_uid: string,
  }
}
