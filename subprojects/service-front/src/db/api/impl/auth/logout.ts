import { IFetchConfig } from 'typings'

export const Logout = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<any> => {
    const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/auth/logout`, {
      ...config.POST,
    })
    await response.json()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return true
  }
}
