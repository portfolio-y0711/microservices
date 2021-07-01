import React from 'react'
import { UserType } from 'typings'

interface UserItemProps {
  user: UserType
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <li className="person" data-chat="person1">
      <div className="user">
        <img src={`/img/${user.img}.png`} alt="Retail Admin" />
        <span className={`status online`}></span>
      </div>
      <p className="name-time">
        <span className="name">{user.name}</span>
      </p>
    </li>
  )
}

export default UserItem
