import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const RemoveFeed = (adaptors: IFeedAdaptors) => {
  return async ({
    feedUid,
  }: {
    feedUid: string
  }): Promise<void> => {
    const { feed } = adaptors
    const feedlist = await feed.findFeedsListWithComments(feedUid)
    
    for (const feedUid of feedlist) {
      await feed.delete_(feedUid)
    }
    
  }
}
