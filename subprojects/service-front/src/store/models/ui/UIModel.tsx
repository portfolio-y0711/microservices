import { useLocalObservable } from 'mobx-react-lite'
import { UIStateType, UIModelType } from './model.ui'
import { IUIService } from 'db/services/ui'
import { runInAction } from 'mobx'

const UIModel = (service: IUIService) => {
  const initialValues: UIStateType = {
    users: [],
    loading: false,
    showWriterPanel: true,
    loginModalRef: undefined,
    selectedLoginUser: undefined,
  }

  const getUsersCommand = async () => {
    runInAction(() => (store.loading = true))
    try {
      const data = await service.readUsers()
      runInAction(() => (store.users = data))
    } catch (e) {
      alert('Something happened. Please try again later.')
    }
    runInAction(() => (store.loading = false))
  }
  const toggleWriterInputCommand = () => {
    store.showWriterPanel = !store.showWriterPanel
  }

  const resetWriterInputCommand = () => {
    store.showWriterPanel = true
  }

  const getInitialProps = async () => {
    await getUsersCommand()
    store.selectedLoginUser = store.users[0]
  }

  const selectNextUserCommand = () => {
    const { users, selectedLoginUser } = store
    const maxIndex = users.length
    let currentIndex = -1

    if (selectedLoginUser == undefined) {
      currentIndex = 0
    } else {
      currentIndex = users.findIndex((user) => user.uuid == selectedLoginUser.uuid)
    }

    const nextIndex = currentIndex == 0 ? maxIndex - 1 : currentIndex - 1
    store.selectedLoginUser = users[nextIndex]
  }

  const selectPreviousUserCommand = () => {
    const { users, selectedLoginUser } = store
    const maxIndex = users.length
    let currentIndex = -1

    if (selectedLoginUser == undefined) {
      currentIndex = 0
    } else {
      currentIndex = users.findIndex((user) => user.uuid == selectedLoginUser.uuid)
    }
    const previouIndex = currentIndex == maxIndex - 1 ? 0 : currentIndex + 1
    store.selectedLoginUser = users[previouIndex]
  }

  const setLoginModalRef = (loginModalRef: HTMLDivElement) => {
    runInAction(() => (store.loginModalRef = loginModalRef))
  }

  const store: UIModelType = useLocalObservable(() => {
    return {
      ...initialValues,
      getInitialProps,
      getUsersCommand,
      setLoginModalRef,
      selectNextUserCommand,
      selectPreviousUserCommand,
      toggleWriterInputCommand,
      resetWriterInputCommand,
    }
  })

  return store
}

export default UIModel
