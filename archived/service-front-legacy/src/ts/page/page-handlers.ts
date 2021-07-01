import { IApi } from "../api"
import { IApp, IFeed, IFeedQueryType, IPageHandler, IStore, IUser } from "../typings"
import { iUserQueryMap, IUserQueryType } from "../typings/vo/user-query-type"

export const FeedPageHandler
    = (api: IApi): IPageHandler => {
        const moduleName = 'feedpage'
        let app: IApp
        let store: IStore

        const setStore = (_store: IStore) => {
            store = _store
        }

        const setApp = (_app: IApp) => {
            app = _app
        }
        const navToPage = async (page: string, model?: any): Promise<void> => {
            const { LOGIN_USER_RECENT_POSTS, LOGIN_USER_UNREAD_FEEDS, SELECT_USER_RECENT_POSTS } = IFeedQueryType
            let selected: string[]
            let feeds: IFeed[]
            let users: IUser[]
            let logginUser: IUser | undefined

            let selectedUserUid: string 
            switch (page) {
                case 'HOME':
                    selected = ['login']
                    users = await api.getUsers()
                    if(await api.login()) {
                        logginUser = await api.getUser(IUserQueryType.LOGIN_USER_PROFILE)
                    } 
                    store.state = {
                        ...store.state,
                        ...{
                            users: users,
                            logginUser: logginUser
                        }
                    }
                    break
                case 'FEEDS':
                    selected = ['login', 'feeder']
                    feeds = await api.getFeeds(LOGIN_USER_UNREAD_FEEDS)
                    store.state = {
                        ...store.state,
                        ...{
                            feeds: feeds
                        }
                    }
                    break
                case 'POST':
                    selected = ['login', 'writer', 'feeder']
                    feeds = await api.getFeeds(LOGIN_USER_RECENT_POSTS)
                    store.state = {
                        ...store.state,
                        ...{
                            feeds: feeds
                        }
                    }
                    break
                case 'FRIEND':
                    selected = ['login', 'selector', 'feeder']
                    selectedUserUid = (model ? model.selectedUserUid : store.state.users[1].uuid)
                    feeds = await api.getFeeds(SELECT_USER_RECENT_POSTS, selectedUserUid)
                    store.state = {
                        ...store.state,
                        ...{
                            feeds: feeds
                        }
                    }
                    break

                case 'LOGOUT': 
                    selected = ['login']
                    store.state = {
                        ...store.state,
                        ...{
                            logginUser: undefined
                        }
                    }
                    break

                default:
                    selected = ['login']
                    break
            }
            app.selectModules(selected)
            app.render()
        }
        return {
            moduleName,
            navToPage,
            setApp,
            setStore
        }
    }
