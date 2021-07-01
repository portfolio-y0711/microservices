import { IFeed } from '../typings'
import { IUser } from '../typings'
import { IUserCommandType } from '../typings'
import { iFeedQueryMap } from '../typings'
import { IFeedQueryType } from '../typings'
import { iUserCommandMap } from '../typings'
import { IFetchConfig } from '../typings'
import { iUserQueryMap, IUserQueryType } from '../typings/vo/user-query-type'
import { urlEncoding } from './index'


export const GetFeeds
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (queryType: IFeedQueryType, selectedUserUid?: string): Promise<IFeed[]> => {
            // const { feed: { baseUrl } } = config
            const params = { ...iFeedQueryMap.get(queryType), ...(selectedUserUid ? ({ userUid: selectedUserUid }) : null) }
            const url = new URL(`${baseUrl ? baseUrl: 'http://localhost:8000'}/api/feeds`)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            const response = await fetch(`${url.href}`, {
                ...config.GET,
            })

            let feeds: IFeed[]
            if (response.status === 200) {
                const rawFeeds: {
                    uuid: string
                    msg: string
                    writer: { uuid: string }
                    likers: string
                    dislikers: string
                }[] = await response.json()
                feeds = rawFeeds.map(raw => ({
                    uuid: raw.uuid,
                    msg: raw.msg,
                    writer: raw.writer,
                    likers: raw.likers.split(','),
                    dislikers: raw.dislikers.split(',')
                }))
                return feeds
            } else {
                return []
            }
        }
    }

export const PostFeed
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (msg: string): Promise<IFeed[]> => {
            // const { feed: { baseUrl } } = config
            const payload: { msg: string } = { msg }
            const formBodyStr = urlEncoding(payload)

            const response = await fetch(`${baseUrl ? baseUrl: 'http://localhost:8000'}/api/feeds`, {
                ...config.POST,
                body: formBodyStr
            })
            if (response.status === 200) {
                const data = await response.json()
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return data
            } else {
                return []
            }
        }
    }

export const Login
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (userUid?: string, pass?: string): Promise<boolean> => {
            // const { auth: { baseUrl } } = config
            const authInfo: { userUid: string, pass: string } = { userUid: userUid as string, pass: pass as string }
            const formBodyStr = urlEncoding(authInfo)

            const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/auth/login`, {
                ...config.POST, body: formBodyStr
            })
            // if (!(response.status === 401)) {
            //     const data = await response.json()
            //     const { logginUser: { name, uuid, userDetail: { device, deviceIcon, img }, leaders, followers, feeds } } = data
            //     const user = ({ name, device, deviceIcon, uuid, img, leaders, followers, feeds }) as IUser
            //     return user
            // } else {
            //     return undefined
            // }
            if (!(response.status === 401)) {
                return true
            } else {
                return false
            }
        }
    }

export const Logout
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (): Promise<any> => {
            // const { auth: { baseUrl } } = config
            const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/auth/logout`, {
                ...config.POST
            })
            const data = await response.json()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return data
        }
    }

export const PutUser
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (commandType: IUserCommandType, selectedUserUid: string): Promise<boolean> => {
            // const { auth: { baseUrl } } = config
            const params = iUserCommandMap.get(commandType)!
            const url = new URL(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/users/${selectedUserUid}`)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const response = await fetch(`${url.href}`, {
                ...config.PUT
            })
            const data = await response.json()
            return true
        }
    }


export const GetUsers
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (): Promise<IUser[]> => {
            // const { auth: { baseUrl } } = config
            const response = await fetch(`${baseUrl ? baseUrl: 'http://localhost:8000'}/api/users`, {
                ...config.GET
            })
            const data = await response.json()
            const users = data.map(e => {
                const { name, uuid, userDetail: { device, deviceIcon, img } } = e
                return ({ name, device, deviceIcon, uuid, img })
            }) as IUser[]
            return users
        }
    }

export const GetUser
    = (config: IFetchConfig, baseUrl?: string) => {
        return async (queryType: IUserQueryType, selectedUserUid?: string): Promise<IUser> => {
            // const { auth: { baseUrl } } = config
            const params = { 
                ...iUserQueryMap.get(queryType), 
                ...(selectedUserUid ? ({ userUid: selectedUserUid }) : null) 
            }
            const url = new URL(`${baseUrl ? baseUrl: 'http://localhost:8000'}/api/users/${selectedUserUid ? selectedUserUid : 'none' }`)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            console.log(url.href)

            const response = await fetch(`${url.href}`, {
                ...config.GET,
            })
            console.log(response)
            const data = await response.json()
            const { name, uuid, userDetail: { device, deviceIcon, img } } = data
            const { leaders, followers, feeds } = data
            return ({
                name,
                device,
                deviceIcon,
                uuid,
                img,
                leaders,
                followers,
                feeds,
            }) as IUser
        }
    }


// export const GetSelectUserProfile
//     = (config: IFetchConfig) => {
//         return async (userUid: string): Promise<IUser> => {
//             const { auth: { baseUrl } } = config
//             const userQuery = {
//                 query: 'profile',
//                 target: 'select_user',
//                 userUid: userUid
//             }
//             const response = await fetch(`${baseUrl}/api/users`, {
//                 ...config.GET,
//                 body: JSON.stringify(userQuery)
//             })
//             const data = await response.json()
//             const { name, uuid, userDetail: { device, deviceIcon, img } } = data
//             return ({
//                 name,
//                 device,
//                 deviceIcon,
//                 uuid,
//                 img,
//             }) as IUser
//         }
//     }
