import './index.css'
import Loader from 'ui/components/Loader'
import Selector from './Selector'

import TabNav from 'ui/components/TabNav'
import HomeTab from 'ui/components/_tabs/HomeTab'
import PostsTab from 'ui/components/_tabs/PostsTab'
import FriendsTab from 'ui/components/_tabs/FriendsTab'

import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Subscription } from 'rxjs'

import { RootServiceContext } from 'store'
import { RootContext } from 'store'

const FriendsPage: React.FC<{ match: any }> = observer(({ match }) => {
  const {
    uiModel: { loading },
    usersModel: { loginUser, selectedUser, getLoginUserCommand },
    feedsModel: { getSelectedUserPostsCommand },
  } = useContext(RootContext)

  const {
    socketUserService: { onUserUpdated },
  } = useContext(RootServiceContext)

  useEffect(() => {
    $('a[href="#home"]').trigger('click')
    const onUserUpdatedSubs = (async () => {
      const obs = await onUserUpdated()
      return obs.subscribe((_) => {
        getLoginUserCommand()
      })
    })()
    return () => {
      async function unsubs() {
        ;((await onUserUpdatedSubs) as Subscription).unsubscribe()
      }
      unsubs()
    }
  })

  return (
    <div className="container bootdey">
      <div className="col-md-12 bootstrap snippets">
        <div>
          {loading ? (
            <Loader banner={'Microservice-Feeds'} />
          ) : (
            <>
              <Selector />
              {!selectedUser ? (
                <>
                  <div className="container">
                    <div id="user-profile-2" className="user-profile">
                      <div className="tabbable">
                        <ul className="nav nav-tabs padding-18">
                          <TabNav
                            onclick={async () => {}}
                            link={'#home'}
                            name={'Profile'}
                            icon={'green ace-icon fa fa-id-badge bigger-120'}
                          />
                        </ul>

                        <div className="tab-content no-border padding-24">
                          <HomeTab
                            user={{
                              img: 'nouser',
                              device: '',
                              deviceIcon: '',
                              feedCursor: 0,
                              name: 'No User Selected',
                              uuid: loginUser.uuid,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="container">
                  <div id="user-profile-2" className="user-profile">
                    <div className="tabbable">
                      <ul className="nav nav-tabs padding-18">
                        <TabNav
                          onclick={async () => {}}
                          link={'#home'}
                          name={'Profile'}
                          icon={'green ace-icon fa fa-id-badge bigger-120'}
                        />
                        <TabNav
                          onclick={async () => getSelectedUserPostsCommand(selectedUser.uuid)}
                          link={'#postsTab'}
                          name={'Posts'}
                          icon={'orange ace-icon fas fa-pencil-alt bigger-120'}
                        />
                        <TabNav
                          onclick={async () => {}}
                          link={'#friendsTab'}
                          name={'Friends'}
                          icon={'blue ace-icon fa fa-users bigger-120'}
                        />
                      </ul>

                      <div className="tab-content no-border padding-24">
                        <HomeTab user={selectedUser} />
                        <PostsTab />
                        <FriendsTab user={selectedUser} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
})

export default FriendsPage
