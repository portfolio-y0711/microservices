import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const ToggleFeedLikers = (adaptors: IFeedAdaptors) => {
  return async ({
    feedUid,
    likerUid,
  }: {
    feedUid: string
    likerUid: string
  }): Promise<Feed> => {
    const { feed } = adaptors

    const currentFeed = await feed.read(feedUid)
    
    const _dislikers = Array.from(
      new Set([...(currentFeed.dislikers as any), likerUid]),
    ).filter((disliker: string) => {
      return disliker != likerUid
    })

    const _likers = currentFeed.likers.includes(likerUid)
      ? Array.from(new Set([...(currentFeed.likers as any), likerUid])).filter(
          (liker: string) => {
            return liker != likerUid
          },
        )
      : Array.from(new Set([...(currentFeed.likers as any), likerUid]))

    const updatedFeed: Feed = await feed.update({
      ...currentFeed,
      dislikers: [..._dislikers],
      likers: [..._likers],
    })
    return updatedFeed
  }
}
