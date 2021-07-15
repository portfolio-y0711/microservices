import { IDBConnector } from '@feed/data/database'
import { Feed } from '@feed/data/database'

import { Create } from './impl'
import { ReadAll } from './impl'
import { Read } from './impl'
import { Update } from './impl'
import { Delete } from './impl'

import { FindFeedsByList } from './impl'
import { FindFeedsListWithComments } from './impl'
import { RemoveCommentFromParent } from './impl'
import { FindOriginalPostWriter } from './impl'

export interface IFeedAdaptor {
  create: (feed: Feed) => Promise<Feed>
  read: (feedUid: string) => Promise<Feed>
  update: (feed: Feed) => Promise<Feed>
  delete_: (feedUid: string) => Promise<boolean>
  findFeedsByList: (feedlist: string[]) => Promise<Feed[]>
  findFeedsListWithComments: (feedUid: string) => Promise<string[]>
  findOriginalPostWriter: (feedUid: string) => Promise<string>
  removeCommentFromParent: (feedUid: string) => Promise<boolean>
}

export const FeedAdaptor = (conn: IDBConnector): IFeedAdaptor => {
  const readAll = ReadAll(conn)
  const read = Read(conn)
  const create = Create(conn)
  const update = Update(conn)
  const delete_ = Delete(conn)
  const findFeedsByList = FindFeedsByList(conn)
  const findFeedsListWithComments = FindFeedsListWithComments(conn)
  const findOriginalPostWriter = FindOriginalPostWriter(conn)
  const removeCommentFromParent = RemoveCommentFromParent(conn)

  return Object.freeze({
    readAll,
    create,
    delete_,
    update,
    read,
    findFeedsByList,
    findFeedsListWithComments,
    findOriginalPostWriter,
    removeCommentFromParent,
  })
}
