import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { RootContext } from 'store'

interface DropdownNavbarItemProps {
  id: string
  link: string
  icon: string
  text: string
}

const LogoutNavbar: React.FC<DropdownNavbarItemProps> = ({ id, link, icon, text }) => {
  const {
    authModel: { logoutAction },
    usersModel: { loginUser, removeLoginUserCommand },
  } = useContext(RootContext)

  const history = useHistory()

  const logoutEventHandler = (e) => {
    e.preventDefault()
    logoutAction()
    removeLoginUserCommand()
    history.push('/')
  }

  const dropdownMenu = () => {
    return (
      <ul className="dropdown-menu">
        <li>
          <div className="navbar-login">
            <div className="row">
              <div className="col-lg-4">
                <p className="text-center">
                  <img
                    className="icon-size"
                    width="80"
                    height="80"
                    alt="120x120"
                    src={`/img/${loginUser.img}.png`}
                  />
                </p>
              </div>
              <div className="col-lg-8">
                <p className="text-left">
                  <strong>{`${loginUser.name}`}</strong>
                </p>
                <p className="text-left small">{`${loginUser.name.toLowerCase()}`}@gmail.com</p>
              </div>
            </div>
          </div>
        </li>
        <li className="divider"></li>
        <li>
          <div className="navbar-login navbar-login-session">
            <div className="row">
              <div className="col-lg-12">
                <p>
                  <a
                    onClick={logoutEventHandler}
                    id="logout"
                    className="btn btn-danger btn-block"
                    href="#"
                  >
                    Logout
                  </a>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
  return (
    <li id={id} className="dropdown">
      <a className="dropdown-toggle" href={link} data-toggle="dropdown">
        <i className={icon}>&nbsp;&nbsp;</i>
        {text} ({`${loginUser.name}`})
      </a>
      {dropdownMenu()}
    </li>
  )
}

export default LogoutNavbar
