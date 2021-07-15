import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const FetchOriginalPostWriter = (adaptors: IFeedAdaptors) => {
  return async (feedUid: string): Promise<string> => {
    const { feed } = adaptors
    return feed.findOriginalPostWriter(feedUid)
  }
}
