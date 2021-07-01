import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'

export const findFeedTree = (conn: Connection) => {
  return async (feedUid: string): Promise<Feed> => {
    return await conn
      .getRepository(Feed)
      .createQueryBuilder('feed')
      .select([
        'feed.feedId',
        'feed.uuid',
        'feed.msg',
        'feed.likers',
        'feed.dislikers',
      ])
      .leftJoin('feed.writer', 'w')
      .addSelect(['w.uuid', 'w.name'])
      .leftJoinAndSelect('feed.replies', 'r')
      .where('feed.uuid = :feedUid', { feedUid })
      .getOneOrFail()
  }
}
