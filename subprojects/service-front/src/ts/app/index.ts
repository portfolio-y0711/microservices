import { IApi } from '../api'
import { IApp, IFeedState, IHandler, IModule, IPageHandler, IStore, IUser } from '../typings'

const app = (() => {

    class App implements IApp {
        api: IApi
        // injectPage / page class, page instance, page handler, page 
        pageCls: new (props?: any) => IModule
        pageIns: IModule
        pageHdl: IPageHandler

        // injectModules / module class, module instance, module properties
        moduleCls: Map<string, new (props?: any) => IModule> = new Map()
        moduleIns: Map<string, IModule> = new Map()
        modulePs: Map<string, string[]> = new Map()

        // injectHandlers / module handler class, module handler instance
        handlerCls: Map<string, { (api: IApi): IHandler }> = new Map()
        handlerIns: Map<string, IHandler> = new Map()

        // tags for modules
        tagEls: string[]
        rootEl: HTMLElement

        // injectStore / proxy_store
        store: IStore
        dom: Document
        handlers: { (api: IApi): IHandler }[]

        constructor() {
            this.rootEl = document.querySelector('#root')!
            // const root = this.rootEl
            // this.tagEls = Array.from(root.children)
            //     .filter(c => c instanceof HTMLUnknownElement)
            //     .map(tagEl => tagEl.tagName)
            // console.log(this.tagEls)
        }
        injectApi(api: IApi) {
            this.api = api; return this
        }
        injectPageAndHandler(pagemap: { [name:string]: (api: IApi) => IHandler }){
            console.log(pagemap)
            console.log(Object.keys(pagemap))
            return this
        }


        injectStore(_store: IStore, _module_props: any) {
            // extract module names
            const module_names
                = Array.from(Object.keys(_module_props))
            // merge props into state
            const state
                = module_names.reduce((acc: any, module_name: string) => {
                    const module_props = _module_props[module_name]
                    const prop_names = Object.keys(module_props)
                    prop_names
                        .forEach((prop_name: string) => {
                            if (!(`${prop_name}` in acc)) {
                                acc[`${prop_name}`] = module_props[`${prop_name}`]
                            }
                        })
                    this.modulePs.set(module_name, prop_names)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return acc
                }, {})
            // inject state into store
            _store.state = state
            _store.listeners.push(this)

            // create proxy of store
            const proxy_store
                = new Proxy(_store, {
                    set: function (store, key, state) {
                        store[key] = state
                        const _state = state as unknown as IFeedState
                        let _logginUser: IUser
                        if (_state.logginUser === undefined) {
                            _logginUser = {
                                name: 'none',
                                device: '',
                                deviceIcon: '',
                                img: '',
                                uuid: '',
                                leaders: [],
                                followers: [],
                                feeds: []
                            }
                        } else {
                            _logginUser = _state.logginUser
                        }
                        const { users, feeds } = _state
                        console.log(`[STORE] login user: ${_logginUser.name}, total users: ${users.length}, feeds: ${feeds.length}`)
                        store.notify()
                        return true
                    },
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    get: (store, key) => store[key]
                })
            this.store = proxy_store
            return this
        }
        injectModules(modules: { new(props: any) }[]) {
            this.moduleCls = new Map(modules.map(m => [m.name, m])); return this
        }
        injectHandlers(handlers: { (api: IApi): IHandler }[]) {
            this.handlerCls = new Map(handlers.map(h => [h.name, h]));
            return this
        }
        injectPageAndLoadHandler(pageArr: any){
            this.pageCls = pageArr[0]
            this.pageHdl = (pageArr[1] as { (api: IApi): IPageHandler })(this.api)
            this.pageHdl.setApp(this)
            this.pageHdl.setStore(this.store)
            window[`${(pageArr[0].name as string).toLowerCase()}`] = this.pageHdl
            return this
        }
        loadModules() {
            for (const [_name, classRef] of this.moduleCls.entries()) {
                const name = _name.toLowerCase()
                const props = this.modulePs.get(name)?.reduce((acc: any, prop_name: string) => {
                    acc[`${prop_name}`] = this.store.state[`${prop_name}`]
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return acc
                }, {})
                const instance = new classRef(props)
                this.moduleIns.set(name, instance)
            }
        }
        // async componentDidMount() {
        //     const users = await this.api.getUsers()
        //     const logginUser = await this.api.login()
        //     if (logginUser !== undefined) {
        //         this.store.state.logginUser = logginUser
        //     }
        //     this.store.state.users = users
        // }
        render() {
            this.dom = new DOMParser().parseFromString(this.pageIns.render(), 'text/html')
            
            const tagEls = Array
                .from(this.dom.documentElement.getElementsByTagName('*'))
                .filter(x => (x instanceof HTMLUnknownElement))
            this.loadModules()

            for (const el of tagEls) {
                const tag = el.tagName.toLowerCase()
                const template = document.createElement('template')
                template.innerHTML = this.moduleIns.get(tag)!.render()
                const targetEl = this.dom.documentElement.querySelector(tag)!
                const parent = targetEl.parentElement!
                targetEl.insertBefore(template.content, parent.children[parent.children.length])
            }
            this.rootEl.innerHTML = this.dom.documentElement.innerHTML
        }
        selectModules(selected: string[]) {
            this.pageIns = new this.pageCls(selected)
        }
        async start() {
            for (const [_, handler] of this.handlerCls) {
                const handlerIns = handler(this.api)
                const name = handlerIns.moduleName.toLowerCase()
                window[`${name}`] = handlerIns
                handlerIns.setStore(this.store)
            }
            this.pageHdl.setStore(this.store)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            this.selectModules(['login'])
            await this.pageHdl.navToPage('HOME')
            this.render()
        }
    }
    return new App()
})()


export {
    app
}
