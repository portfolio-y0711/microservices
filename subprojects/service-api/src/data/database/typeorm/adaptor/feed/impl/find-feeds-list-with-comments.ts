import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'
import { normalize } from './util'

export const FindFeedsListWithComments = (conn: IDBConnector) => {
  return async (feedUid: string): Promise<string[]> => {
    const db: Connection = await conn.getConnection()
    
    const feed = normalize(await db.getRepository(Feed)
      .findOneOrFail({
        where: {
          uuid: feedUid
        }
      }))
      
    try {
        const stack: string[] = []
        const store: string[] = []
        stack.unshift(...feed.childrenlist)

        while(stack.length) {
          const nodeUid: string = stack.shift()
          store.push(nodeUid)
          const node = normalize(await db.getRepository(Feed)
            .findOneOrFail({
              where: {
                uuid: nodeUid
              }
            }))
          const childrenlist = node.childrenlist
          if (childrenlist.length > 0) {
            for (let i = childrenlist.length - 1; i >= 0; i--) {
              const child = childrenlist[i]
              stack.unshift(child)
            }
          }
        }
      return [feedUid, ...store]
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  }
}
