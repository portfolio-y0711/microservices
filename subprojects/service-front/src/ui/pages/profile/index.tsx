import './index.css'
import Loader from 'ui/components/Loader'
import TabNav from 'ui/components/TabNav'
import FriendsTab from 'ui/components/_tabs/FriendsTab'
import HomeTab from 'ui/components/_tabs/HomeTab'
import PostsTab from 'ui/components/_tabs/PostsTab'

import { useContext, useEffect } from 'react'
import { RootContext } from 'store'

const ProfilePage = () => {
  const {
    usersModel: { loginUser },
    uiModel: { loading },
  } = useContext(RootContext)

  useEffect(() => {
    $('a[href="#home"]').trigger('click')
  })

  if (loading) {
    return (
      <>
        <div className="pageloader gray-bg">
          <div className="loader">
            <span>Microservice-Feeds</span>
            <div className="sp-hydrogen"></div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className="container bootdey">
        <div className="col-md-12 bootstrap snippets">
          <div>
            {loading ? (
              <Loader banner={'Microservice-Feeds'} />
            ) : (
              <>
                {!loginUser ? (
                  <></>
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
                            onclick={async () => {}}
                            link={'#friendsTab'}
                            name={'Friends'}
                            icon={'blue ace-icon fa fa-users bigger-120'}
                          />
                        </ul>

                        <div className="tab-content no-border padding-24">
                          <HomeTab user={loginUser} />
                          <PostsTab />
                          <FriendsTab user={loginUser} />
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
  }
}

export default ProfilePage
