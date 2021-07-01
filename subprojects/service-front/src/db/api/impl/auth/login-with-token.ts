import { IFetchConfig } from 'typings'

export const LoginWithToken = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<boolean> => {
    const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/auth/login`, {
      ...config.POST,
    })
    if (!(response.status === 401)) {
      return true
    } else {
      return false
    }
  }
}
