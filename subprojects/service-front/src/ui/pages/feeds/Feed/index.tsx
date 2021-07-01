import { FeedType, UserType } from 'typings'
import { useContext, useState } from 'react'
import { RootContext } from 'store'
import { RootServiceContext } from 'store'

interface FeedProps {
  feed: FeedType
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
  const {
    uiModel: { users, toggleWriterInputCommand  },
    usersModel: { loginUser },
  } = useContext(RootContext)

  const [replyClicked, setReplyClicked] = useState(false)

  const toggleReplyClicked = () => {
    setReplyClicked(!replyClicked)
  }

  const {
    socketFeedService: { 
      thumbsUp, 
      thumbsDown,
      delete_,
    },
  } = useContext(RootServiceContext)

  const writer: UserType = users.find((user: UserType) => user.uuid == feed.writer.uuid)
  return (
    <div key={feed.uuid} className="media-block">
      <a className="media-left" href="#">
        <img className="img-circle img-sm" alt="profile" src={`/img/${writer.img}.png`} />
      </a>
      <div className="media-body">
        <div className="mar-btm">
          <a className="btn-link text-semibold media-heading box-inline" href="#">
            {writer.name}
          </a>
          <p className="text-muted text-sm">
            <i className={`fa ${writer.deviceIcon} fa-lg`} /> - From Mobile - 7 min ago
          </p>
          <p>{feed.msg}</p>
          <div className="pad-ver">
            <span 
              className="tag tag-sm"
              style={{
                marginRight: "2px"
              }}
            >
              <i className="fa fa-heart text-danger"></i>{' '}
              {feed.likers.filter((liker) => liker !== '').length -
                feed.dislikers.filter((liker) => liker !== '').length}{' '}
              Likes
            </span>
            <div className="btn-group">
              <button
                className={`btn btn-sm btn-default btn-hover-success ${
                  feed.likers.includes(loginUser.uuid) ? 'active' : null
                }`}
                onClick={(e) => (
                  e.preventDefault(), thumbsUp({ likerUid: loginUser.uuid, feedUid: feed.uuid })
                )}
              >
                <i className="fa fa-thumbs-up"></i>
              </button>
              <button
                className={`btn btn-sm btn-default btn-hover-danger ${
                  feed.dislikers.includes(loginUser.uuid) ? 'active' : null
                }`}
                onClick={(e) => (
                  e.preventDefault(),
                  thumbsDown({ dislikerUid: loginUser.uuid, feedUid: feed.uuid })
                )}
              >
                <i className="fa fa-thumbs-down"></i>
              </button>

            { (loginUser.uuid == writer.uuid) ? (<>
              <button 
                onClick={() => { delete_({ ownerUid: loginUser.uuid, feedUid: feed.uuid }) }}
                className="btn btn-sm btn-danger btn-action pull-right" 
                data-toggle="tooltip" 
                title="" 
                data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" 
                data-confirm-yes="alert('Deleted')" 
                data-original-title="Delete"
                style={{
                  marginLeft: "2px"
                }}
                ><i className="fas fa-trash"></i>
              </button>
            </>) : (undefined) }

            </div>

            { (loginUser.leaders.includes(writer.uuid) || loginUser.uuid == writer.uuid) ? (<>
              <button 
                style={{
                  marginLeft: "2px"
                }}
                onClick={() => (toggleReplyClicked(), toggleWriterInputCommand() ) }
                className="btn btn-sm btn-default btn-hover-primary">
                Comment
              </button>
            </>) : (undefined) }

          </div>
        </div>
        <hr />

        {replyClicked ? (
          <>
              <div
                className="media-block"
                style={{
                  backgroundColor: '#f1f3f5',
                }}
              >
                <a className="media-left" href="#">
                  <img
                    className="img-circle img-sm"
                    alt="Profile Picture"
                    src="/img/avatar2.png"
                  />
                </a>
                <div className="media-body">
                  <div className="mar-btm">
                    <a href="#" className="btn-link text-semibold media-heading box-inline">
                      Bobby Marz
                    </a>
                    <p className="text-muted text-sm">
                      <i className="fa fa-mobile fa-lg"></i> - From Mobile - 7 min ago
                    </p>
                  </div>
                  <hr />
                  <form
                    name="replyform"
                    style={{
                      marginRight: '15px',
                    }}
                  >
                    <textarea
                      id="reply"
                      // ref={inputRef}
                      className="form-control"
                      name="msg"
                      rows={2}
                      // onKeyPress={handleKeyPress}
                      // onChange={updateInput}
                      placeholder="What are you thinking?"
                    />
                    <input
                      type="hidden"
                      name="feedUid"
                      id="feedUid"
                      value={feed.uuid}
                    />
                    <div className="mar-top clearfix">
                      <button
                        // onClick={postFeed}
                        className="btn btn-sm btn-primary pull-right"
                        type="button"
                      >
                        <i className="fas fa-pencil-alt fa-fw"></i>
                        Submit
                      </button>

                      <button className="btn btn-trans btn-icon fas fa-video add-tooltip"></button>
                      <button className="btn btn-trans btn-icon fas fa-camera add-tooltip"></button>
                      <button className="btn btn-trans btn-icon fas fa-file add-tooltip"></button>
                    </div>
                  </form>
                  <hr />
                </div>
              </div>
            <br />
          </>
        ) : (
          <></>
        )}
        {/* 
                      <p>
                        Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      </p>
                      <div className="pad-ver">
                        <div className="btn-group">
                          <a className="btn btn-sm btn-default btn-hover-success active" href="#">
                            <i className="fa fa-thumbs-up"></i> You Like it
                          </a>
                          <a className="btn btn-sm btn-default btn-hover-danger" href="#">
                            <i className="fa fa-thumbs-down"></i>
                          </a>
                        </div>
                        <a className="btn btn-sm btn-default btn-hover-primary" href="#">
                          Comment
                        </a>
                      </div>
                      */}
      </div>
    </div>
  )
}

export default Feed
