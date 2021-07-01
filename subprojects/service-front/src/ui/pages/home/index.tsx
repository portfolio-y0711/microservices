import Popup from 'ui/pages/home/popup/Popup'

import { useEffect, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { observer } from 'mobx-react-lite'
import { RootContext } from 'store'

const HomePage = observer(() => {
  const {
    usersModel: { loginUser, getLoginUserCommand },
    uiModel: { loading, getInitialProps },
  } = useContext(RootContext)

  const [showPopup, setShowpopup] = useState(true)

  useEffect(() => {
    getInitialProps()
    getLoginUserCommand()
  }, [])

  const togglePopup = () => {
    setShowpopup(!showPopup)
  }

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
  }

  if (loginUser) {
    return <Redirect to={'/profile'} />
  } else {
    return showPopup ? (
      <Popup text="공지 사항 & 변경 이력 😘 " closePopup={togglePopup.bind(this)} />
    ) : null
  }
})

export default HomePage
