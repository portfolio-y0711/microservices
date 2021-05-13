import { IDBConnection } from '@feed/database'
import { Feed } from '@feed/database'

import { Create } from './impl/c-r-u-d'
import { ReadAll } from './impl/c-r-u-d'
import { Read } from './impl/c-r-u-d'
import { Update } from './impl/c-r-u-d'
import { Delete } from './impl/c-r-u-d'

import { ReadAllofUser } from './impl/read-all-of-user'
import { FindFeedsByList } from './impl/find-feeds-by-list'

export interface IFeedAdaptor {
    create: (feed: Feed) => Promise<Feed>
    findFeedsByList: (feedlist: string[]) => Promise<Feed[]>
    readAllofUser: (userUid: string) => Promise<Feed[]>
}

export const FeedAdaptor
    = (conn: IDBConnection): IFeedAdaptor => {
        const readAll = ReadAll(conn)
        const read = Read(conn)
        const create = Create(conn)
        const update = Update(conn)
        const delete_ = Delete(conn)
        const findFeedsByList = FindFeedsByList(conn)
        const readAllofUser = ReadAllofUser(conn)

        return Object.freeze({
            findFeedsByList,
            readAll,
            create,
            delete_,
            read,
            update,
            readAllofUser,
        })
    }
