import { baseUrl } from '../config/index.json' // <-- need to refactor this
import { FeedType } from 'typings'
import { IUserQueryType } from 'typings'
import { IUserCommandType } from 'typings'
import { IFetchConfig } from 'typings'
import { IFeedQueryType } from 'typings'
import { IFeedCommandType } from 'typings'
import { UserType } from 'typings'
import { fetchConfig } from './fetch.config'

import { GetFeeds } from './impl'
import { GetUser } from './impl'
import { GetUsers } from './impl'

import { Login } from './impl'
import { LoginWithToken } from './impl'
import { Logout } from './impl'
import { PutFeed } from './impl'

import { PostFeed } from './impl'
import { PutUser } from './impl'

import { GetChatUsers } from './impl'
import { GetChatServerURL } from './impl'

export interface IApi {
  login: (userUid: string, pass: string) => Promise<string>
  loginWithToken: () => Promise<boolean>
  logout: () => Promise<boolean>
  postFeed: (msg: string) => Promise<void>
  getUsers: () => Promise<UserType[]>
  getUser: (queryType: IUserQueryType, selectedUserUid?: string) => Promise<UserType>
  putUser: (commandType: IUserCommandType, selectedUserUid: string) => Promise<boolean>
  getFeeds: (queryType: IFeedQueryType, selectedUserUid?: string) => Promise<FeedType[]>
  putFeed: (
    commandType: IFeedCommandType,
    feedId: string,
    loginUserUid?: string,
  ) => Promise<boolean>
  getChatUsers: () => Promise<string[]>
  getChatServerURL: () => Promise<string>
}
export const CreateApi = (config: IFetchConfig, baseUrl?: string): IApi => {
  const login = Login(config, baseUrl)
  const loginWithToken = LoginWithToken(config, baseUrl)
  const logout = Logout(config, baseUrl)
  const getUsers = GetUsers(config, baseUrl)
  const putUser = PutUser(config, baseUrl)
  const postFeed = PostFeed(config, baseUrl)
  const getFeeds = GetFeeds(config, baseUrl)
  const getUser = GetUser(config, baseUrl)
  const putFeed = PutFeed(config, baseUrl)
  const getChatUsers = GetChatUsers(config, baseUrl)
  const getChatServerURL = GetChatServerURL(config, baseUrl)

  return {
    login,
    loginWithToken,
    logout,
    postFeed,
    getUsers,
    putUser,
    getFeeds,
    getUser,
    putFeed,
    getChatUsers,
    getChatServerURL,
  }
}

export const urlEncoding = (formInput: { [name: string]: string }): string => {
  return [...Object.entries(formInput)]
    .reduce((acc: [], [key, val]: [string, string]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(val)
      ;(acc as string[]).push(encodedKey + '=' + encodedValue)
      return acc
    }, [])
    .join('&')
}

export const api = CreateApi(fetchConfig, baseUrl)
