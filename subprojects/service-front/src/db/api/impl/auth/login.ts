import { IFetchConfig } from 'typings'
import { urlEncoding } from 'db/api'

export const Login = (config: IFetchConfig, baseUrl?: string) => {
  return async (userUid?: string, pass?: string): Promise<string> => {
    const authInfo: { userUid: string; pass: string } = {
      userUid: userUid as string,
      pass: pass as string,
    }
    const formBodyStr = urlEncoding(authInfo)

    const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/auth/login`, {
      ...config.POST,
      body: formBodyStr,
    })

    if (response.status === 200) {
      return (await response.json()).token
    } else {
      return undefined
    }
  }
}
