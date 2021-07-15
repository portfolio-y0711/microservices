import Feeder from 'ui/pages/feeds/Feeder'
import Writer from 'ui/pages/posts/Writer'
import Loader from 'ui/components/Loader'

import { RootContext } from 'store'
import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { RootServiceContext } from 'store'
import { Subscription } from 'rxjs'

const PostsPage = observer(() => {
  const {
    feedsModel: { loading, posts, getLoginUserPostsCommand },
    uiModel: { resetWriterInputCommand },
  } = useContext(RootContext)

  const {
    socketFeedService: { onPostsUpdated },
  } = useContext(RootServiceContext)

  useEffect(() => {
    resetWriterInputCommand()

    const subsPostUpdated = (async () => {
      const obs = onPostsUpdated()
      return obs.subscribe(async (_) => {
        getLoginUserPostsCommand()
      })
    })()
    getLoginUserPostsCommand()
    return () => {
      async function unsubs() {
        ;((await subsPostUpdated) as Subscription).unsubscribe()
      }
      unsubs()
    }
  }, [])

  return (
    <div>
      {loading ? (
        <Loader banner={'Microservice-Feeds'} />
      ) : (
        <>
          <div className="container bootdey">
            <div className="col-md-12 bootstrap snippets">
              <Writer />
              <Feeder 
              toShowPad={true}
              feeds={posts} />
            </div>
          </div>
        </>
      )}
    </div>
  )
})

export default PostsPage
