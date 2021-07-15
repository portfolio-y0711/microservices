import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { IDBConnector } from '@feed/data/database'
import LOGGER from '@config/logger/winston'

export const FindOriginalPostWriter = (conn: IDBConnector) => {
  return async (feedUid: string): Promise<string> => {
    const db: Connection = await conn.getConnection()

    let node = await db.getRepository(Feed)
      .findOneOrFail({
        where: {
          uuid: feedUid
        }
      })

    while (node?.parentUid !== "0") {
      node = await db.getRepository(Feed)
        .findOneOrFail({
          where: {
            uuid: node.parentUid
          }
        })
    }
    const result = node.writerUid
    LOGGER.debug(result)
    return result
  }
}
