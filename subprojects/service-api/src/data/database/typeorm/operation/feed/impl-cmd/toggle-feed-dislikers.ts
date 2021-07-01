import { Feed } from '@feed/data/database/typeorm/entities'
import { IFeedAdaptors } from '@feed/data/database/typeorm/adaptor'

export const ToggleFeedDislikers = (adaptors: IFeedAdaptors) => {
  return async ({
    feedUid,
    dislikerUid,
  }: {
    feedUid: string
    dislikerUid: string
  }): Promise<Feed> => {
    const { feed } = adaptors

    const currentFeed = await feed.read(feedUid)

    const _likers = Array.from(
      new Set([...(currentFeed.likers as any), dislikerUid]),
    ).filter((liker: string) => {
      return liker != dislikerUid
    })

    const _dislikers = currentFeed.dislikers.includes(dislikerUid)
      ? Array.from(
          new Set([...(currentFeed.dislikers as any), dislikerUid]),
        ).filter((liker: string) => {
          return liker != dislikerUid
        })
      : Array.from(new Set([...(currentFeed.dislikers as any), dislikerUid]))

    const updatedFeed: Feed = await feed.update({
      ...currentFeed,
      likers: [..._likers],
      dislikers: [..._dislikers],
    })
    console.log(updatedFeed)
    return updatedFeed
  }
}
