import { useContext, useEffect } from 'react'
import Feeder from 'ui/pages/feeds/Feeder'

import { observer } from 'mobx-react-lite'
import { Subscription } from 'rxjs'
import { RootContext } from 'store'
import { RootServiceContext } from 'store'

interface PostsTabProps {}

const PostsTab: React.FC<PostsTabProps> = observer(() => {
  const {
    usersModel: { selectedUser },
    feedsModel: { posts, getSelectedUserPostsCommand },
  } = useContext(RootContext)

  const {
    socketFeedService: { onFeedUpdated },
  } = useContext(RootServiceContext)

  useEffect(() => {
    const subsPostUpdated = (async () => {
      const obs = await onFeedUpdated()
      return obs.subscribe(async (msg) => {
        getSelectedUserPostsCommand(selectedUser.uuid)
      })
    })()
    return () => {
      async function unsubs() {
        ;((await subsPostUpdated) as Subscription).unsubscribe()
      }
      unsubs()
    }
  })

  return (
    <div id="postsTab" className="tab-pane in active">
      <div className="row">
        <Feeder feeds={posts}></Feeder>
      </div>
    </div>
  )
})

export default PostsTab
