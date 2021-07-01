import { IAmqpConnector } from '../connection'
import { PostFeedListener } from './feeds/post-feed-listener'
import { PutFeedLikeListener } from './feeds/put-feed-like-listener'
import { IFeedCmdService } from '@feed/services'
import { IUserCmdService } from '@feed/services'
import { PutFeedDislikeListener } from './feeds/put-feed-dislike-listener'
import { PutUserFollowToggleListener } from './users/put-toggle-follow-listener'
import { PutFeedDeleteListener } from './feeds/put-feed-delete-listener'

export interface IAmqpOperation {
  postFeedListener: () => Promise<void>
  putFeedLikeListener: () => Promise<void>
  putFeedDislikeListener: () => Promise<void>
  putFeedDeleteListener: () => Promise<void>
  putUserFollowToggleListener: () => Promise<void>
  init: () => Promise<void>
}

export const AmqpOperation = (
  cmdServices: {
    feedCmdService: IFeedCmdService
    userCmdService: IUserCmdService
  }
) => (
  amqpConnector: IAmqpConnector,
): IAmqpOperation => {
    const postFeedListener = PostFeedListener(amqpConnector, cmdServices)
    const putFeedLikeListener = PutFeedLikeListener(amqpConnector, cmdServices)
    const putFeedDislikeListener = PutFeedDislikeListener(amqpConnector, cmdServices,)
    const putFeedDeleteListener = PutFeedDeleteListener(amqpConnector, cmdServices)
    const putUserFollowToggleListener = PutUserFollowToggleListener(amqpConnector, cmdServices)

    const init = async () => {
      await postFeedListener()
      await putFeedLikeListener()
      await putFeedDeleteListener()
      await putFeedDislikeListener()
      await putUserFollowToggleListener()
    }

    return {
      postFeedListener,
      putFeedLikeListener,
      putFeedDislikeListener,
      putUserFollowToggleListener,
      putFeedDeleteListener,
      init,
    }
  }
