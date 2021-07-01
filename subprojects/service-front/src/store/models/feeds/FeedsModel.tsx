import { useLocalObservable } from 'mobx-react-lite'
import { FeedsModelType, FeedsStateType } from './model.feeds'
import { runInAction } from 'mobx'
import { IFeedsService } from 'db/services'
import { FeedType } from 'typings'

const FeedsModel = (service: IFeedsService) => {
  const initialValues: FeedsStateType = {
    feeds: [] as FeedType[],
    posts: [] as FeedType[],
    loading: false,
  }

  const getLoginUserFeedsCommand = async () => {
    runInAction(() => (store.loading = true))
    try {
      // const data = await service.fetchFeeds()
      runInAction(async () => (store.feeds = await service.fetchFeeds()))
    } catch (e) {
      alert('Something happened. Please try again later.')
    }
    runInAction(() => (store.loading = false))
  }

  const getLoginUserPostsCommand = async () => {
    runInAction(() => (store.loading = true))
    try {
      runInAction(async () => (store.posts = await service.fetchPosts()))
    } catch (e) {
      alert('Something happened. Please try again later.')
    }
    runInAction(() => (store.loading = false))
  }

  const getSelectedUserPostsCommand = async (userUid: string) => {
    runInAction(() => (store.loading = true))
    try {
      runInAction(async () => (store.posts = await service.fetchSelectedUserPosts(userUid)))
    } catch (e) {
      alert('Something happened. Please try again later.')
    }
    runInAction(() => (store.loading = false))
  }

  const store: FeedsModelType = useLocalObservable(() => {
    return {
      ...initialValues,
      getLoginUserFeedsCommand,
      getLoginUserPostsCommand,
      getSelectedUserPostsCommand,

      get totalFeedsCount() {
        return store.feeds.length
      },
    }
  })

  return store
}

export default FeedsModel
