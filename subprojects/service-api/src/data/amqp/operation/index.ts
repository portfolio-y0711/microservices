import { IAmqpConnector } from '../connection'
import { IFeedCmdService } from '@feed/services'
import { IFeedQueryService } from '@feed/services'
import { IUserQueryService } from '@feed/services'
import { IUserCmdService } from '@feed/services'

import { PostFeedConsumer } from './feeds/impl'
import { PutThumbsupConsumer } from './feeds/impl'
import { PutThumbsdownConsumer } from './feeds/impl'
import { PutUserFollowToggleListener } from './users/impl'
import { DeletePostConsumer } from './feeds/impl'
import { PostCommentConsumer } from './feeds/impl'

export interface IAmqpOperation {
  postCommentConsumer: Promise<void>
  postFeedConsumer: Promise<void>
  putThumbsupConsumer: Promise<void>
  putThumbsdownConsumer: Promise<void>
  deletePostConsumer: Promise<void>
  putToggleFollowConsumer: Promise<void>
}

export const AmqpOperation =
  (services: {
    feedCmdService: IFeedCmdService
    feedQueryService: IFeedQueryService
    userCmdService: IUserCmdService
    userQueryService: IUserQueryService
  }) =>
  (amqpConnector: IAmqpConnector): IAmqpOperation => {
    const postCommentConsumer = PostCommentConsumer(amqpConnector, services)
    const postFeedConsumer = PostFeedConsumer(amqpConnector, services)
    const putThumbsupConsumer = PutThumbsupConsumer(amqpConnector, services)
    const putThumbsdownConsumer = PutThumbsdownConsumer(
      amqpConnector,
      services,
    )
    const deletePostConsumer = DeletePostConsumer(
      amqpConnector,
      services,
    )
    const putToggleFollowConsumer = PutUserFollowToggleListener(
      amqpConnector,
      services,
    )

    return {
      postFeedConsumer,
      putThumbsupConsumer,
      putThumbsdownConsumer,
      putToggleFollowConsumer,
      deletePostConsumer,
      postCommentConsumer,
  }
}
