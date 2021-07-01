import { IFetchConfig } from 'typings'

export const GetChatUsers = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<string[]> => {
    const url = new URL(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/chatUsers`)

    const response = await fetch(`${url.href}`, {
      ...config.GET,
    })

    if (response.status === 200) {
      return response.json()
    } else {
      return []
    }
  }
}
