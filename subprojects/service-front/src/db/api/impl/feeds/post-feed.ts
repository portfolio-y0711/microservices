import { IFetchConfig } from 'typings'

import { FeedType } from 'typings'
import { urlEncoding } from 'db/api'

export const PostFeed = (config: IFetchConfig, baseUrl?: string) => {
  return async (msg: string): Promise<void> => {
    const payload: { msg: string } = { msg }
    const formBodyStr = urlEncoding(payload)

    const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/feeds`, {
      ...config.POST,
      body: formBodyStr,
    })
    console.log(response)

    if (response.status === 200) {
      const data = await response.json()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data
    } else {
      return
    }
  }
}
