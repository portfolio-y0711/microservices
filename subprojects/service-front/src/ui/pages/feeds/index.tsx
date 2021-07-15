import Feeder from 'ui/pages/feeds/Feeder'
import Loader from 'ui/components/Loader'

import {useEffect, useContext} from 'react'
import {observer} from 'mobx-react-lite'

import {RootContext} from 'store'
import {RootServiceContext} from 'store'
import { Subscription } from 'rxjs';

const FeedsPage = observer(() => {
  const {
    feedsModel: {
      loading,
      feeds,
      getLoginUserFeedsCommand
    },
    usersModel: {
      getLoginUserCommand
    }
  } = useContext(RootContext)

  const {
    socketFeedService: {
      onFeedUpdated
    }} = useContext(RootServiceContext)

  useEffect(() => {
    const subsFeedUpdated = (async() => {
      const obs = onFeedUpdated()
      return obs.subscribe(async(_) => {
        getLoginUserFeedsCommand()
      })
    })()
    getLoginUserFeedsCommand()
    getLoginUserCommand()
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
      <div>{
        loading ? <Loader banner={'Microservice-Feeds'}/> : <Feeder 
        toShowPad={true}
        feeds={feeds}/>
      }</div>
    </div>
  )
})

export default FeedsPage
