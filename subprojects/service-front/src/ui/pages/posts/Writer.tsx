import { observer } from 'mobx-react-lite'
import { KeyboardEvent, useEffect, useContext, useRef } from 'react'
import { RootContext } from 'store'
import { RootServiceContext } from 'store'

interface WriterProps {}

const Writer: React.FC<WriterProps> = observer(() => {
  const inputRef: React.LegacyRef<HTMLTextAreaElement> = useRef(null)

  const {
    usersModel: { loginUser },
    uiModel: { users, showWriterPanel },
  } = useContext(RootContext)

  const {
    socketFeedService: { post },
  } = useContext(RootServiceContext)

  const { img, name, device, deviceIcon, leaders } = loginUser
  const friends = users.filter((u) => leaders.includes(u.uuid))
  const postFeed = () => {
    if (inputRef.current!.value.trim() == '') {
      return
    }
    post({ parentUid: "0", loginUserUid: loginUser.uuid, msg: inputRef.current.value })
    inputRef.current!.value = ''
  }

  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    inputRef.current!.value = e.target.value
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter') {
      if (!e!.shiftKey) {
        if (inputRef.current!.value.trim() == '') {
          return
        }
        post({ parentUid: "0", loginUserUid: loginUser.uuid, msg: inputRef.current.value })
        inputRef.current!.value = ''
        $(e.target as HTMLTextAreaElement).val('')
      }
    }
  }
  useEffect(() => {
    if (showWriterPanel) {
      inputRef.current.focus()
    } else {
      $('textarea#reply').focus()
    }
  })

  return (
    <div
      className="panel"
      style={{
        backgroundColor: showWriterPanel ? '#f1f3f5' : undefined,
      }}
    >
      <div className="panel-body">
        <a className="media-left" href="#">
          <img className="img-circle img-md" alt="Profile Picture" src={`img/${img}.png`} />
        </a>
        <div className="media-body">
          <div className="mar-btm">
            <a className="btn-link text-semibold media-heading box-inline" href="#">
              {name}
            </a>
            <p className="text-muted text-sm">
              <i className={`fa ${deviceIcon} fa-lg`}></i> - From {device}
            </p>
          </div>
        </div>
        <div className="media-body">
          <div className="col-lg-12">
            <span className="image-list m-t-20">
              {friends.map((f, idx) => (
                <a key={idx} href="#">
                  <img
                    className="img-thumbnail img-circle img-xs"
                    src={`img/${f.img}.png`}
                    alt="user"
                    width="50"
                  />
                </a>
              ))}
            </span>
          </div>
        </div>
        {showWriterPanel ? (
          <>
            <hr />
            <form name="feedform">
              <textarea
                ref={inputRef}
                className="form-control"
                name="msg"
                id="msg"
                rows={2}
                onKeyPress={handleKeyPress}
                onChange={updateInput}
                placeholder="What are you thinking?"
              ></textarea>
              <input type="hidden" name="access_token" id="access_token" value="#access_token" />
              <div className="mar-top clearfix">
                <button
                  onClick={postFeed}
                  className="btn btn-sm btn-primary pull-right"
                  type="button"
                >
                  <i className="fas fa-pencil-alt fa-fw"></i>
                  Publish
                </button>

                <button className="btn btn-trans btn-icon fas fa-video add-tooltip"></button>
                <button className="btn btn-trans btn-icon fas fa-camera add-tooltip"></button>
                <button className="btn btn-trans btn-icon fas fa-file add-tooltip"></button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
        {/*
         */}
      </div>
    </div>
  )
})

export default Writer
