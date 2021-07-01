import { IApi } from 'db/api'
import { UserLogin } from './user-login'
import { UserLogout } from './user-logout'
import { UserLoginWithJwt } from './user-login-with-jwt'

export interface IAuthService {
  userLogin: (userUid: string, password: string) => Promise<string>
  userLogout: () => Promise<boolean>
  userLoginWithJwt: () => Promise<boolean>
}

const AuthService = (api?: IApi): IAuthService => {
  const userLogin = UserLogin(api)
  const userLoginWithJwt = UserLoginWithJwt(api)
  const userLogout = UserLogout(api)

  return {
    userLogin,
    userLogout,
    userLoginWithJwt,
  }
}

export default AuthService
