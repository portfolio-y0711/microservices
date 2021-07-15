import React from 'react'
import { useHistory } from 'react-router-dom'

interface NavbarItemProps {
  id: string
  link: string
  icon: string
  text: string
  action?: any
  num?: number
}

const NavbarItem: React.FC<NavbarItemProps> = ({ id, link, icon, text, action, num }) => {
  const history = useHistory()
  const clickEventHandler = (e) => {
    e.preventDefault()
    if (!!action) {
      action()
      history.push(link)
    } else {
      history.push(link)
    }
  }
  return (
    <li id={id}>
      <a href={link} className="nav__link" data-link onClick={(e) => clickEventHandler(e)}>
        <i className={icon}>&nbsp;&nbsp;</i> {text}
        {(num !== undefined) && (num > 0) ? (
          <>
            <span style={{ marginLeft: '5px', marginTop: '-15px' }} className="badge badge-dot">
              {num}
            </span>
          </>
        ) : (
          <></>
        )}
      </a>
    </li>
  )
}

export default NavbarItem
