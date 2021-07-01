import { useLocalObservable } from 'mobx-react-lite'
import { AuthStateType, AuthModelType } from './model.auth'
import { runInAction } from 'mobx'
import { IAuthService } from 'db/services/auth'

const AuthModel = (service: IAuthService) => {
  const initialValues: AuthStateType = {
    token: undefined,
    loading: false,
  }

  const loginAction = async (formdata?: { uuid: string; password: string }) => {
    let { uuid, password } = formdata
    const token = await service.userLogin(uuid, password)
    if (token) {
      runInAction(async () => (store.token = token))
      return true
    } else {
      return false
    }
  }

  const logoutAction = async () => {
    await service.userLogout()
  }

  const store: AuthModelType = useLocalObservable(() => {
    return {
      ...initialValues,
      loginAction,
      logoutAction,
    }
  })

  return store
}

export default AuthModel
