import { ChatMessage } from 'store/models/chat/model.chat'
import { IFetchConfig } from 'typings'

export const GetChatMessages = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<ChatMessage[]> => {
    const url = new URL(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/chatMessages`)

    const response = await fetch(`${url.href}`, {
      ...config.GET,
    })


    if (response.status === 200) {
      const result = response.json()
      console.log(result)
      return result
    } else {
      return []
    }
  }
}
