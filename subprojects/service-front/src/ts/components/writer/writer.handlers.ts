import { IApi } from '../../api'
import { IHandler, IStore } from '../../typings'

export const WriterHandler
    = (api: IApi): IHandler => {

        const moduleName = 'Writer'
        let store: IStore
        const setStore = (_store: IStore) => { store = _store; return null }

        const postFeed
            = async (form: HTMLFormElement) => {
                const msg = form.elements['msg'].value
                const feeds = await api.postFeed(msg)
                const newState = {
                    ...store.state, ...{ comments: [...feeds] }
                }
                store.state = { ...store.state, ...newState }
            }

        return {
            postFeed,
            setStore,
            moduleName,
        }
    }