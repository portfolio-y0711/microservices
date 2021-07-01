import { RootContext } from 'store/rootModelStore'
import { observer } from 'mobx-react-lite'
import { UserType } from 'typings'
import { useContext } from 'react'
import FriendItem from './FriendItem'

interface FriendsTabProps {
  user: UserType
}

const FriendsTab: React.FC<FriendsTabProps> = observer(({ user }) => {
  const {
    uiModel: { users },
  } = useContext(RootContext)
  const friends = user.leaders.map((uuid) => users.find((u) => u.uuid == uuid))

  return (
    <div id="friendsTab" className="tab-pane">
      <div className="profile-users clearfix">
        {friends.map((friend, index) => {
          return <FriendItem key={index} user={friend} />
        })}
      </div>

      <div className="hr hr10 hr-double"></div>

      <ul className="pager pull-right">
        <li className="previous disabled">
          <a href="#">← Prev</a>
        </li>

        <li className="next">
          <a href="#">Next →</a>
        </li>
      </ul>
    </div>
  )
})

export default FriendsTab
