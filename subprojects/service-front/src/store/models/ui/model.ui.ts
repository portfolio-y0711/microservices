import { UserType } from 'typings'

export type UIStateType = {
  users: UserType[]
  loading: boolean
  loginModalRef: HTMLDivElement
  showWriterPanel: boolean
  selectedLoginUser: UserType
}

export type UIActionType = {
  getUsersCommand: () => Promise<void>
  getInitialProps: () => void

  selectNextUserCommand: () => void
  selectPreviousUserCommand: () => void
  toggleWriterInputCommand: () => void
  resetWriterInputCommand: () => void

  setLoginModalRef: (loginModalRef: HTMLDivElement) => void
}

export type UIModelType = {} & UIStateType & UIActionType
