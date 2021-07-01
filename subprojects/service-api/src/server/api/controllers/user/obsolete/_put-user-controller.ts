import { Request } from 'express'
import { IUserCmdService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { IUserCommandType } from '@feed/data/database/typeorm/vo/user-command'

export const PutUser = (service: IUserCmdService) => {
  return async (httpRequest: Request): Promise<IHttpResponse> => {
    let result: any
    let statusCode: number

    const { userUid } = httpRequest.params
    const { command } = httpRequest.query
    const { login_user_uid } = httpRequest.body

    const { FOLLOW_FRIEND, UNFOLLOW_FRIEND, NO_SUCH_COMMAND } = IUserCommandType

    result = false

    switch (command) {
      case FOLLOW_FRIEND:
        result = await service.followFriend({
          loginUserUid: login_user_uid,
          friendUid: userUid,
        })
        break
      case UNFOLLOW_FRIEND:
        result = await service.unfollowFriend({
          loginUserUid: login_user_uid,
          friendUid: userUid,
        })
        break
      case NO_SUCH_COMMAND:
        statusCode = 500
        result = {
          msg: 'no such command',
        }
        break
    }

    const httpResponse = {
      statusCode: 200,
      body: {
        msg: 'updated',
      },
    }

    if (result === true) {
      return httpResponse
    }
  }
}
