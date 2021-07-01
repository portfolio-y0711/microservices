import NavbarItem from './NavbarItem'
import LogoutNavbar from './LogoutNavbar'

import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootContext } from 'store'

const Navbar = observer(() => {
  const {
    uiModel: { getUsersCommand },
    usersModel: { loginUser },
  } = useContext(RootContext)

  useEffect(() => {
    getUsersCommand()
  }, [])

  return (
    <div className="navbar navbar-default navbar-static-top">
      <div className="container bootstrap snippets bootdey">
        <div className="navbar-header">
          <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">
            <strong>Microservice-Feeds</strong>
          </a>
        </div>
        <div className="navbar-collapse collapse in" aria-expanded="true">
          <ul className="nav navbar-nav navbar-right">
            {!loginUser ? (
              <>
                <NavbarItem
                  id={'login'}
                  link={'/login'}
                  icon={'fas fa-user-slash'}
                  text={'login'}
                />
              </>
            ) : (
              <>
                <NavbarItem
                  id={'feeds'}
                  link={'/feeds'}
                  icon={'fas fa-rss-square'}
                  text={'feeds'}
                  num={1}
                />
                <NavbarItem
                  id={'posts'}
                  link={'/posts'}
                  icon={'fas fa-pencil-alt'}
                  text={'posts'}
                />
                <NavbarItem
                  id={'friends'}
                  link={'/friends'}
                  icon={'fas fa-users'}
                  text={'friends'}
                />
                <NavbarItem id={'chat'} link={'/chat'} icon={'fas fa-comments'} text={'chat'} />
                <NavbarItem
                  id={'profile'}
                  link={'/profile'}
                  icon={'fas fa-id-badge'}
                  text={'profile'}
                />
                <LogoutNavbar id={'logout'} link={'/'} icon={'fas fa-user'} text={'logout'} />
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
})

export default Navbar
