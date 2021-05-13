import { IFeed, IUser } from './entities'

export interface IFetchConfig {
    // feed: {
    //     baseUrl: string,
    // },
    // auth: {
    //     baseUrl: string,
    // },
    POST: any,
    PUT: any,
    GET: any,
    // DELETE: any,
}

export interface IApp {
    selectModules: (selected: string[]) => void 
    render: () => void
}

export interface IHandler {
    moduleName: string
    setStore: (store: IStore) => void
    [name: string]: any
}

export interface IPageHandler {
    moduleName: string
    setApp: (app: IApp) => void
    setStore: (store: IStore) => void
    navToPage: (page: string) => Promise<any>
    [name: string]: any
}
export interface IStoreState {
    users: IUser[]
    logginUser: IUser | undefined
    feeds: IFeed[]
}

export interface IStore {
    listeners: any[]
    notify: () => void
    state: IStoreState
}

export interface IModule {
    props: any
    render: () => string
    handler: IHandler
}