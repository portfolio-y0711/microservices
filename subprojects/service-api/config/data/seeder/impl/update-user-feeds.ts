import { Connection } from "typeorm"
import { Feed, User } from '@feed/data/database'
import { EUserUid } from '@config/data/typings';

export const UpdateUserFeeds
  = (conn: Connection) => {
    return (userTable: Map<EUserUid, string>) => {
      return async (userSelection: (EUserUid| EUserUid[]) /*| User['uuid'][] */): Promise<string> => {
        const _updateUserFeed = async(_userUid) : Promise<string> => {
          const logs: string[] = []
          const user = await conn.getRepository(User)
            .findOneOrFail({
              where: {
                uuid: _userUid
              }
            })
          for (const leader of user.leaders) {
            const feeds = await conn.createQueryBuilder()
              .select(['f.uuid'])
              .from(Feed, 'f')
              .leftJoin('f.writer', 'fw')
              .where('fw.uuid = :uuid', { uuid: leader })
              .getMany()
            const feedList: string[] = feeds.reduce((prev, curr) => {
              prev.push(curr.uuid)
              return prev
            }, [] as string[])
            const log = `feeds: ${userTable.get(_userUid)} has received ${feedList.length} feeds from ${userTable.get(leader as EUserUid)}`
            user.feeds.push(...feedList)
            await conn.getRepository(User)
              .save(user)
            logs.push(log)
          }
          return logs.join('\n')
        }

        if (Array.isArray(userSelection)) {
          return (await Promise.all((userSelection as []).map(_userUid => _updateUserFeed(_userUid)))).join('\n')

        } else {
          return (await _updateUserFeed(userSelection))
        }
      }
    }
  }