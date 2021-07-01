import { IFetchConfig } from 'typings'

export const Logout = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<any> => {
    const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/auth/logout`, {
      ...config.POST,
    })
    const data = await response.json()
    console.log(data)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return true
  }
}
