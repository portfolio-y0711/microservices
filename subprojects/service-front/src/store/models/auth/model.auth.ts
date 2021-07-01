export type AuthStateType = {
  token: string
  loading: boolean
}

export type AuthActionType = {
  loginAction: (formdata?: { uuid: string; password: string }) => Promise<boolean>
  logoutAction: () => Promise<void>
}

export type AuthModelType = {} & AuthStateType & AuthActionType
