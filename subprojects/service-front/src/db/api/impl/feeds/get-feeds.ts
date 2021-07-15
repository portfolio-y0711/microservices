import { IFetchConfig } from 'typings'
import { iFeedQueryMap } from 'typings'
import { IFeedQueryType } from 'typings'
import { FeedType } from 'typings'

export const GetFeeds = (config: IFetchConfig, baseUrl?: string) => {
  return async (queryType: IFeedQueryType, selectedUserUid?: string): Promise<FeedType[]> => {
    const params = {
      ...iFeedQueryMap.get(queryType),
      ...(selectedUserUid ? { userUid: selectedUserUid } : null),
    }
    const url = new URL(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/feeds`)
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

    const response = await fetch(`${url.href}`, {
      ...config.GET,
    })

    let feeds: FeedType[]

    if (response.status === 200) {
      const rawFeeds: {
        uuid: string
        msg: string
        writerUid: string
        likers: string[]
        dislikers: string[]
        parentUid: string
        childrenlist: string[]
      }[] = await response.json()
      feeds = rawFeeds.map((raw) => {
         return ({
          uuid: raw.uuid,
          msg: raw.msg,
          writerUid: raw.writerUid,
          likers: raw.likers,
          dislikers: raw.dislikers,
          parentUid: raw.parentUid,
          childrenlist: raw.childrenlist,
        })
      })
        return feeds
      } else {
        return []
      }
  }
  }
