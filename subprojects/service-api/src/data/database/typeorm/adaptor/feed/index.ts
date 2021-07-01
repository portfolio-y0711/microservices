import { IDBConnector } from '@feed/data/database'
import { Feed } from '@feed/data/database'

import { Create } from './impl/c-r-u-d'
import { ReadAll } from './impl/c-r-u-d'
import { Read } from './impl/c-r-u-d'
import { Update } from './impl/c-r-u-d'
import { Delete } from './impl/c-r-u-d'

import { ReadAllofUser } from './impl/read-all-of-user'
import { FindFeedsByList } from './impl/find-feeds-by-list'
import { PushFeedLiker } from './impl/push-feed-liker'

export interface IFeedAdaptor {
  create: (feed: Feed) => Promise<Feed>
  read: (feedUid: string) => Promise<Feed>
  update: (feed: Feed) => Promise<Feed>
  delete_: (feedUid: string) => Promise<boolean>
  findFeedsByList: (feedlist: string[]) => Promise<Feed[]>
  readAllofUser: (userUid: string) => Promise<Feed[]>
  pushFeedLiker: ({ feedUid: feedUid, likerUid: likerUid }) => Promise<Feed>
}

export const FeedAdaptor = (conn: IDBConnector): IFeedAdaptor => {
  const readAll = ReadAll(conn)
  const read = Read(conn)
  const create = Create(conn)
  const update = Update(conn)
  const delete_ = Delete(conn)
  const findFeedsByList = FindFeedsByList(conn)
  const readAllofUser = ReadAllofUser(conn)
  const pushFeedLiker = PushFeedLiker(conn)

  return Object.freeze({
    findFeedsByList,
    readAll,
    create,
    delete_,
    update,
    read,
    readAllofUser,
    pushFeedLiker,
  })
}
