import './typings/global'
import { app } from './app'
import { CreateApi } from './api'
import { fetchConfig } from './api/fetch.config'
import { props, store } from './store'

import { Navbar } from './components'
import { Selector } from './components'
import { Feeder } from './components'
import { Writer } from './components'
import { Login } from './components'
import { FeedPage } from './page'

import { SelectorHandler } from './components'
import { WriterHandler } from './components'
import { FeederHandler } from './components'
import { LoginHandler } from './components'
import { FeedPageHandler } from './page'

void (async () => {
    const { baseUrl } = await (await fetch('/baseurl')).json()
    const api = CreateApi(fetchConfig, baseUrl)

    void app
        .injectApi(api)
        .injectStore(store, props)
        .injectModules([
            Navbar,
            Login,
            Feeder,
            Selector,
            Writer,
        ])
        .injectHandlers([
            LoginHandler,
            FeederHandler,
            SelectorHandler,
            WriterHandler,
        ])
        .injectPageAndLoadHandler([
            FeedPage, FeedPageHandler
        ])
        .start()
})()


// const config = await (await fetch('./config.json')).json()
// const config = {
//     "feed": {
//         "baseUrl": "http://localhost:8000"
//     },
//     "auth": {
//         "baseUrl": "http://localhost:8000"
//     },
//     "GET": {
//         "method": "GET",
//         "credentials": "include",
//         "headers": {
//             "Content-Type": "application/json"
//         }
//     },
//     "POST": {
//         "method": "POST",
//         "credentials": "include",
//         "headers": {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     },
//     "PUT": {
//         "method": "PUT",
//         "mode": "cors",
//         "credentials": "include",
//         "headers": {
//             "Content-Type": "application/json"
//         }
//     }
// }
// const api = CreateApi(config)
