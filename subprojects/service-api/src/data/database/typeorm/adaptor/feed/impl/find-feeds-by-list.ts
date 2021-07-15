import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'
import { normalize } from './util';

export const FindFeedsByList = (conn: IDBConnector) => {
  return async (feedlist: string[]): Promise<Feed[]> => {
    const db: Connection = await conn.getConnection()
    const result = []
    try {
        const stack: string[] = []
        const store: string[] = []
        stack.unshift(...feedlist)

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
          result.push(node)
          if (childrenlist.length > 0) {
            for (let i = childrenlist.length - 1; i >= 0; i--) {
              const child = childrenlist[i]
              stack.unshift(child)
            }
          }
        }
        return result as Feed[]
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  }
}
