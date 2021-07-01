import { UserType } from 'typings'

import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Subscription } from 'rxjs'

import { RootContext } from 'store'
import { RootServiceContext } from 'store'

const FriendsNav: React.FC = observer(() => {
  const {
    usersModel: {
      loginUser,
      isFollowedQuery,
      getSelectedUserCommand,
      selectedUser,
      getLoginUserCommand,
    },
    uiModel: { users },
  } = useContext(RootContext)

  const {
    socketUserService: { onUserUpdated },
  } = useContext(RootServiceContext)

  const changeSelectedUser = async (userUid: string) => {
    await getSelectedUserCommand(userUid)
  }

  useEffect(() => {
    const subsUserUpdated = (async () => {
      const obs = await onUserUpdated()
      return obs.subscribe(async (_) => {
        getLoginUserCommand()
      })
    })()
    return () => {
      async function unsubs() {
        ;((await subsUserUpdated) as Subscription).unsubscribe()
      }
      unsubs()
    }
  }, [loginUser])

  return (
    <ul className="ace-thumbnails clearfix">
      {users
        .filter((user: UserType) => user.uuid !== loginUser.uuid)
        .map((thumbnailUser: UserType, idx: number) => {
          const isFollowed = isFollowedQuery(thumbnailUser.uuid)
          const isSelected = () => {
            if (selectedUser) {
              return thumbnailUser.uuid == selectedUser.uuid
            }
            return false
          }
          return (
            <li
              key={`${thumbnailUser.uuid}`}
              onClick={() => changeSelectedUser(thumbnailUser.uuid)}
              data-toggle="tooltip"
              data-original-title={`${thumbnailUser.name}`}
              id={`${thumbnailUser.uuid}`}
              className={`${isSelected() ? 'selected' : ''}`}
            >
              <Link to={`/friends/${thumbnailUser.uuid}`}>
                <div className="cboxElement" data-rel="colorbox">
                  <img width="80" height="80" alt="80x80" src={`/img/${thumbnailUser.img}.png`} />
                  <div className="text">
                    <div className="inner"></div>
                  </div>
                  <div className="tags">
                    <span className="label-holder">
                      {isFollowed ? <span className="label label-success">followed</span> : null}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
    </ul>
  )
})

export default FriendsNav
