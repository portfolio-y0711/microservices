import { IFetchConfig } from 'typings'
import { iFeedCommandMap } from 'typings'
import { IFeedCommandType } from 'typings'

export const PutFeed = (config: IFetchConfig, baseUrl?: string) => {
  return async (
    commandType: IFeedCommandType,
    feedId: string,
    loginUserUid?: string,
  ): Promise<boolean> => {
    console.log('putFeed called')
    const params = iFeedCommandMap.get(commandType)!
    console.log(params)
    const url = new URL(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/feeds/${feedId}`)
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
    const response = await fetch(`${url.href}`, {
      ...config.PUT,
    })

    // if (response.status === 200) {
    //     const data = await response.json()
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //     return data
    // } else {
    //     return true
    // }
    return true
  }
}
