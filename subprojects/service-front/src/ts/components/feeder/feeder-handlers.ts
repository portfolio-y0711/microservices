import { IApi } from '../../api'
import { IFeedQueryType, IHandler, IStore } from '../../typings'

export const FeederHandler
    = (api: IApi): IHandler => {
        const moduleName = 'Feeder'
        let store: IStore

        const setStore = (_store: IStore) => { store = _store }
        const toggle = async () => {
            const feeds = await api.getFeeds(IFeedQueryType.LOGIN_USER_UNREAD_FEEDS)
            store.state = {
                ...store.state,
                ...{
                    feeds: feeds
                }
            }
        }

        return {
            toggle,
            moduleName,
            setStore,
        }
    }