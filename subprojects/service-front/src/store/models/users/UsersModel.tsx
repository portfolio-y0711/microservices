import { useLocalObservable } from 'mobx-react-lite'
import { runInAction } from 'mobx'
import { UsersStateType, UsersModelType } from './model.users'
import { IUsersService } from 'db/services/users'

const UsersModel = (service: IUsersService) => {
  const initialValues: UsersStateType = {
    loginUser: undefined,
    selectedUser: undefined,
  }

  const getLoginUserCommand = async () => {
    const loginUser = await service.readLoginUser()
    runInAction(async () => (store.loginUser = loginUser))
  }

  const removeLoginUserCommand = async () => {
    runInAction(() => (store.loginUser = undefined))
  }

  const getSelectedUserCommand = async (userUid: string) => {
    const selectedUser = await service.readSelectedUser(userUid)
    runInAction(async () => (store.selectedUser = selectedUser))
  }

  const isFollowedQuery = (userUid: string) => {
    return store.loginUser.leaders.includes(userUid)
  }

  const store: UsersModelType = useLocalObservable(() => {
    return {
      ...initialValues,
      getLoginUserCommand,
      getSelectedUserCommand,
      removeLoginUserCommand,
      isFollowedQuery,
    }
  })

  return store
}

export default UsersModel
