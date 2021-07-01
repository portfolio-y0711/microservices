import { UserType } from 'typings'

import { observer } from 'mobx-react-lite'
import { useContext, useState, useEffect } from 'react'

import { RootContext } from 'store'
import { RootServiceContext } from 'store'

interface HomeTabProps {
  user: UserType
}

const HomeTab: React.FC<HomeTabProps> = observer(({ user }) => {
  const {
    usersModel: { loginUser, selectedUser },
  } = useContext(RootContext)

  const [buttonText, setButtonText] = useState('')
  const [classText, setClassText] = useState('')

  const isFollowed = loginUser.leaders.includes(user.uuid)

  const {
    socketUserService: { toggleFollow },
  } = useContext(RootServiceContext)

  const invertTextOnEnter = () =>
    isFollowed ? $('span#buttonText').text('UnFollow') : $('span#buttonText').text('Follow')

  const invertTextOnLeave = () =>
    !isFollowed ? $('span#buttonText').text('Not Followed') : $('span#buttonText').text('Followed')

  const invertClassOnEnter = () =>
    isFollowed
      ? ($('button#buttonClass').addClass('btn-warning'),
        $('button#buttonClass').removeClass('btn-success'))
      : ($('button#buttonClass').addClass('btn-success'),
        $('button#buttonClass').removeClass('btn-warning'))

  const invertClassOnLeave = () =>
    !isFollowed
      ? ($('button#buttonClass').addClass('btn-warning'),
        $('button#buttonClass').removeClass('btn-success'))
      : ($('button#buttonClass').addClass('btn-success'),
        $('button#buttonClass').removeClass('btn-warning'))

  useEffect(() => {
    isFollowed ? setButtonText('Followed') : setButtonText('Not Followed')
    isFollowed ? setClassText('success') : setClassText('warning')
  })

  return (
    <div id="home" className="tab-pane in active">
      <div className="row">
        <div className="col-xs-12 col-sm-3 center">
          <span className="profile-picture">
            <img
              className="editable img-responsive"
              alt=" Avatar"
              id="avatar2"
              src={`/img/${user.img}.png`}
            />
          </span>

          <div className="space space-4"></div>

          {user.uuid !== loginUser.uuid ? (
            <>
              <button
                id="buttonClass"
                className={`btn btn-sm btn-block btn-${classText}`}
                onMouseEnter={(_) => {
                  invertTextOnEnter()
                  invertClassOnEnter()
                }}
                onMouseLeave={(_) => {
                  invertTextOnLeave()
                  invertClassOnLeave()
                }}
                onClick={(_) =>
                  toggleFollow({ loginUserUid: loginUser.uuid, userUid: selectedUser.uuid })
                }
              >
                <i className="ace-icon fa fa-plus-circle bigger-120"></i>
                <span id="buttonText" className="bigger-110">
                  {buttonText}
                </span>
              </button>

              <button className="btn btn-sm btn-block btn-primary">
                <i className="ace-icon fa fa-envelope-o bigger-110"></i>
                <span className="bigger-110">Send Message</span>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="col-xs-12 col-sm-9">
          <h4 className="blue">
            <span className="middle"></span>
          </h4>

          <div className="profile-user-info">
            <div className="profile-info-row">
              <div className="profile-info-name"> username </div>

              <div className="profile-info-value blue">
                <span>{user.name}</span>
              </div>
            </div>

            <div className="profile-info-row">
              <div className="profile-info-name"> location </div>

              <div className="profile-info-value">
                <i className="fa fa-map-marker light-orange bigger-110"></i>
                <span>Seoul</span>
                <span>Korea</span>
              </div>
            </div>

            <div className="profile-info-row">
              <div className="profile-info-name"> age </div>

              <div className="profile-info-value">
                <span>-</span>
              </div>
            </div>

            {/* <div className="profile-info-row">
              <div className="profile-info-name"> joined </div>

              <div className="profile-info-value">
                <span>2021/06/15</span>
              </div>
            </div> */}

            <div className="profile-info-row">
              <div className="profile-info-name"> website </div>

              <div className="profile-info-value">
                <a href="http://portfolio-y0711.com:81/" target="_blank">
                  http://portfolio-y0711.com:81/
                </a>
              </div>
            </div>

            <div className="profile-info-row">
              <div className="profile-info-name"> github </div>

              <div className="profile-info-value">
                <a href="http://github.com/portfolio-y0711" target="_blank">
                  http://github.com/portfolio-y0711
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-20"></div>

      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-small">
              <h4 className="widget-title smaller">
                <i className="ace-icon fa fa-check-square-o bigger-110"></i>
                Introduction
              </h4>
            </div>

            <div className="widget-body">
              <div className="widget-main">
                <p>
                  <br />
                  My job is mostly lorem ipsuming and dolor sit ameting as long as consectetur
                  adipiscing elit.
                  <br />
                  <br />
                  Sometimes quisque commodo massa gets in the way and sed ipsum porttitor facilisis.
                </p>
                <p>Thanks for visiting my profile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default HomeTab
