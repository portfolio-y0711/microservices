import { IFetchConfig } from 'typings'
import { iUserCommandMap } from 'typings'
import { IUserCommandType } from 'typings'

export const PutUser = (config: IFetchConfig, baseUrl?: string) => {
  return async (commandType: IUserCommandType, selectedUserUid: string): Promise<boolean> => {
    const params = iUserCommandMap.get(commandType)!
    console.log(params)

    const url = new URL(
      `${baseUrl ? baseUrl : 'http://localhost:8000'}/api/users/${selectedUserUid}`,
    )
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

    const response = await fetch(`${url.href}`, {
      ...config.PUT,
    })
    const data = await response.json()
    return true
  }
}
