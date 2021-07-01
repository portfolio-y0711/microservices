import { IFetchConfig } from 'typings'

import { UserType } from 'typings'
import { iUserQueryMap } from 'typings'
import { IUserQueryType } from 'typings'

export const GetUser = (config: IFetchConfig, baseUrl?: string) => {
  return async (queryType: IUserQueryType, selectedUserUid?: string): Promise<UserType> => {
    const params = {
      ...iUserQueryMap.get(queryType),
      ...(selectedUserUid ? { userUid: selectedUserUid } : null),
    }
    const url = new URL(
      `${baseUrl ? baseUrl : 'http://localhost:8000'}/api/users/${
        selectedUserUid ? selectedUserUid : 'none'
      }`,
    )
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

    const response = await fetch(`${url.href}`, {
      ...config.GET,
    })

    const data = await response.json()

    if (!data || 'error' in data) {
      return undefined
    } else {
      const {
        name,
        uuid,
        userDetail: { device, deviceIcon, img },
      } = data
      const { leaders, followers, feeds } = data
      return {
        name,
        device,
        deviceIcon,
        uuid,
        img,
        leaders,
        followers,
        feeds,
      } as UserType
    }
  }
}
