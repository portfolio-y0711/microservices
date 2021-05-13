import { Request } from 'express'
import { IUserService } from '@feed/services'
import { IHttpResponse } from '@feed/typings'
import { IUserCommandType } from '@feed/database/typeorm/vo/user-command'
import { createUserCommandType } from '@feed/database/typeorm/vo/user-command'

export const PutUser
    = (service: IUserService) => {
        return async (httpRequest: Request): Promise<IHttpResponse> => {
            const command = httpRequest.query as any
            let result: any
            let statusCode: number

            const { userUid } = httpRequest.params
            const { login_user_uid } = httpRequest.body
            
            result = false

            const type = createUserCommandType({ ...command, friend: userUid })
            
            switch (type) {
                case IUserCommandType.FOLLOW_FRIEND:
                    result = await service.followFriend({ loginUserUid: login_user_uid, friendUid: userUid})
                    break
                case IUserCommandType.UNFOLLOW_FRIEND:
                    result = await service.unfollowFriend({ loginUserUid: login_user_uid, friendUid: userUid})
                    break
                case IUserCommandType.NO_SUCH_COMMAND:
                    statusCode = 500
                    result = {
                        msg: 'no such command'
                    }
                    break
            }

            const httpResponse = {
                statusCode: 200,
                body: {
                    msg: 'updated'
                }
            }

            if (result === true) {
                return httpResponse
            }
        }
    }

