import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const RemoveFeed = (adaptors: IFeedAdaptors) => {
  return async ({
    ownerUid,
    feedUid,
  }: {
    ownerUid: string
    feedUid: string
  }): Promise<boolean> => {
    const { feed } = adaptors
    const result = await feed.delete_(feedUid)

    return result
  }
}
