import Feeder from 'ui/pages/feeds/Feeder'
import Loader from 'ui/components/Loader'

import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Subscription } from 'rxjs'

import { RootContext } from 'store'
import { RootServiceContext } from 'store'

const FeedsPage = observer(() => {
  const {
    feedsModel: { loading, feeds, getLoginUserFeedsCommand },
  } = useContext(RootContext)

  const {
    socketFeedService: { onFeedUpdated },
  } = useContext(RootServiceContext)

  useEffect(() => {
    const subsFeedUpdated = (async () => {
      const obs = await onFeedUpdated()
      return obs.subscribe(async (msg) => {
        getLoginUserFeedsCommand()
      })
    })()
    getLoginUserFeedsCommand()
    return () => {
      async function unsubs() {
        ;((await subsFeedUpdated) as Subscription).unsubscribe()
      }
      unsubs()
    }
  }, [])

  return (
    <div className="container bootdey">
      <div className="col-md-12 bootstrap snippets"></div>
      <div>{loading ? <Loader banner={'Microservice-Feeds'} /> : <Feeder feeds={feeds} />}</div>
    </div>
  )
})

export default FeedsPage
