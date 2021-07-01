import UserItem from './UserItem'
import { UserType } from 'typings'

interface UsersProps {
  chatUsers: UserType[]
}

const Users: React.FC<UsersProps> = ({ chatUsers }) => {
  if (chatUsers.length > 0) {
    return (
      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <div className="users-container">
          <div className="chat-search-box">
            <div className="input-group">
              <input className="form-control" placeholder="Search" />
              <div className="input-group-btn">
                <button type="button" className="btn btn-info">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>

          <ul className="users">
            {chatUsers.map((user, index) => {
              return <UserItem key={index} user={user} />
            })}
          </ul>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Users
