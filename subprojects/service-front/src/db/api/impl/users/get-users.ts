import { IFetchConfig } from 'typings'
import { UserType } from 'typings'

export const GetUsers = (config: IFetchConfig, baseUrl?: string) => {
  return async (): Promise<UserType[]> => {
    // const { auth: { baseUrl } } = config
    const response = await fetch(`${baseUrl ? baseUrl : 'http://localhost:8000'}/api/users`, {
      ...config.GET,
    })
    const data = await response.json()

    const users = data.map((e) => {
      const {
        name,
        uuid,
        userDetail: { device, deviceIcon, img },
      } = e
      return { name, device, deviceIcon, uuid, img }
    }) as UserType[]
    return users
  }
}
