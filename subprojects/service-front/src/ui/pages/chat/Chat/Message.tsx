import React, { useContext } from 'react'
import { RootContext } from 'store'

interface MessageProps {
  user: {
    uuid: string
    name: string
    img: string
    msg: string[]
  }
}

const Message: React.FC<MessageProps> = ({ user }) => {
  const {
    usersModel: { loginUser },
  } = useContext(RootContext)
  return (
    <>
      {user.uuid !== loginUser.uuid ? (
        <>
          <li className={`chat-left`}>
            <div className="chat-avatar">
              <img src={`/img/${user.img}.png`} alt="Retail Admin" />
              <div className="chat-name">{user.name}</div>
            </div>
            <div className="chat-text">
              {user.msg.map((m, index) => {
                return (
                  <div key={index}>
                    {m}
                    <br />
                  </div>
                )
              })}
            </div>
            <div className="chat-hour">
              08:55 <span className="fa fa-check-circle"></span>
            </div>
          </li>
        </>
      ) : (
        <>
          <li className={`chat-right`}>
            <div className="chat-hour">
              08:56 <span className="fa fa-check-circle"></span>
            </div>
            <div className="chat-text">
              {user.msg.map((m, index) => {
                return (
                  <div key={index}>
                    {m}
                    <br />
                  </div>
                )
              })}
            </div>
            <div className="chat-avatar">
              <img src={`/img/${user.img}.png`} alt="Retail Admin" />
              <div className="chat-name">{user.name}</div>
            </div>
          </li>
        </>
      )}
    </>
  )
}

export default Message
