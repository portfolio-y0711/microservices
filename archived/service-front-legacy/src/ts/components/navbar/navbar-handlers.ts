import { IHandler, IStore } from '../../typings'
import { IApi } from '../../api'

export const NavbarHandler
    = (api: IApi): IHandler => {
        const moduleName = 'Navbar'
        let store: IStore

        const setStore = (_store: IStore) => { store = _store }
        return {
            moduleName,
            setStore
        }
    }
