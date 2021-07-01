import { IFetchConfig } from 'typings'

export const GetChatServerURL = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<string> => {
    const url = new URL(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/chatServerURL`)

    const response = await fetch(`${url.href}`, {
      ...config.GET,
    })

    if (response.status === 200) {
      return (await response.json()).url
    } else {
      return
    }
  }
}
