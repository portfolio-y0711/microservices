import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const RemoveComment = (adaptors: IFeedAdaptors) => {
  return async ({
    feedUid,
  }: {
    feedUid: string
  }): Promise<void> => {
    const { feed } = adaptors
    await feed.removeCommentFromParent(feedUid)
    await feed.delete_(feedUid)
    
  }
}
