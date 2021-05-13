import { IStore } from '../typings'
import { IFeedPageModuleState as IFeedPageModuleProps } from '../typings'

export const store: IStore
    = (() => {
        const listeners: { loadModules: () => void, render: () => void }[] = []
        const notify = () => {
            listeners.forEach((l) => {
                l.loadModules()
                l.render()
            })
        }
        let state: any
        return {
            listeners,
            notify,
            state
        }
    })()

export const props: IFeedPageModuleProps
    = {
    login: {
        logginUser: undefined,
        users: [],
    },
    navbar: {
        logginUser: undefined,
        users: []
    },
    selector: {
        logginUser: undefined,
        users: []
    },
    feeder: {
        logginUser: undefined,
        users: [],
        feeds: [],
    },
    writer: {
        logginUser: undefined,
        users: []
    }
}