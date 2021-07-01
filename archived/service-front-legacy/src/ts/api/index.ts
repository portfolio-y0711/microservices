import { IFeed } from '../typings'
import { IUser } from '../typings'
import { IFetchConfig } from '../typings'
import { IFeedQueryType } from '../typings'
import { IUserCommandType } from '../typings'
import { IUserQueryType } from '../typings/vo/user-query-type'

import { GetFeeds } from './apis'
import { GetUser } from './apis'
import { GetUsers } from './apis'
import { Login } from './apis'
import { Logout } from './apis'
import { PostFeed } from './apis'
import { PutUser } from './apis'

export interface IApi {
    login: (userUid?: string, pass?: string) => Promise<boolean>
    logout: () => Promise<void>
    postFeed: (msg: string) => Promise<IFeed[]>
    getUsers: () => Promise<IUser[]>
    getUser: (queryType: IUserQueryType, selectedUserUid?: string) => Promise<IUser>
    putUser: (commandType: IUserCommandType, selectedUserUid: string) => Promise<boolean>
    getFeeds: (queryType: IFeedQueryType, selectedUserUid?: string) => Promise<IFeed[]>
}
export const CreateApi
    = (config: IFetchConfig, baseUrl?: string): IApi => {
        const login = Login(config, baseUrl)
        const logout = Logout(config, baseUrl)
        const getUsers = GetUsers(config, baseUrl)
        const putUser = PutUser(config, baseUrl)
        const postFeed = PostFeed(config, baseUrl)
        const getFeeds = GetFeeds(config, baseUrl)
        const getUser = GetUser(config, baseUrl)

        return {
            login,
            logout,
            postFeed,
            getUsers,
            putUser,
            getFeeds,
            getUser,
        }
    }

export const urlEncoding
    = (formInput: { [name: string]: string }): string => {
        return [...Object.entries(formInput)]
            .reduce((acc: [], [key, val]: [string, string]) => {
                const encodedKey = encodeURIComponent(key)
                const encodedValue = encodeURIComponent(val);
                (acc as string[]).push(encodedKey + "=" + encodedValue)
                return acc
            }, []).join('&')

    }

