import { UserType } from 'typings'

interface FriendsTabProps {
  user: UserType
}

const FriendItem: React.FC<FriendsTabProps> = ({ user }) => {
  return (
    <div className="itemdiv memberdiv">
      <div className="inline pos-rel">
        <div className="user">
          <a href="#">
            <img src={`/img/${user.img}.png`} alt="Bob Doe's avatar" />
          </a>
        </div>

        <div className="body">
          <div className="name">
            <a href="#">
              <span className="user-status status-online"></span>
              {user.name}
            </a>
          </div>
        </div>

        {/* <div className="popover">
          <div className="arrow"></div>
          <div className="popover-content">
            <div className="bolder">Content Editor</div>

            <div className="time">
              <i className="ace-icon fa fa-clock-o middle bigger-120 orange"></i>
              <span className="green"> 20 mins ago </span>
            </div>

            <div className="hr dotted hr-8"></div>

            <div className="tools action-buttons">
              <a href="#">
                <i className="ace-icon fa fa-facebook-square blue bigger-150"></i>
              </a>

              <a href="#">
                <i className="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
              </a>

              <a href="#">
                <i className="ace-icon fa fa-google-plus-square red bigger-150"></i>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default FriendItem
