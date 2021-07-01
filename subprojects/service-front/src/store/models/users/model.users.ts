import { UserType } from 'typings'

export type UsersStateType = {
  loginUser: UserType | undefined
  selectedUser: UserType | undefined
}

export type UsersActionType = {
  isFollowedQuery: (userUid: string) => boolean
  getLoginUserCommand: () => Promise<void>
  getSelectedUserCommand: (userUid: string) => Promise<void>
  removeLoginUserCommand: () => Promise<void>
}

export type UsersModelType = {} & UsersStateType & UsersActionType
