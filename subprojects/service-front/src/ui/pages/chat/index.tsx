import './index.css'
import Chat from './Chat'
import Users from './Users'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Subscription } from 'rxjs'
import { RootContext } from 'store'
import { RootServiceContext } from 'store'

const ChatPage = observer(() => {
  const {
    usersModel: { loginUser },
    uiModel: { users },
    chatModel: { chatUsers, setChatUsersCommand },
  } = useContext(RootContext)

  const {
    socketChatService: { onJoin, join, onLeave, leave },
    apiChatService: { fetchChatUsers },
  } = useContext(RootServiceContext)

  useEffect(() => {
    ;(async () => {
      const chatUsers = await fetchChatUsers()
      setChatUsersCommand(chatUsers)
    })()

    const subsJoin = (async () => {
      const obs = await onJoin()
      return obs.subscribe(async () => {
        const currUsers = await fetchChatUsers()
        setChatUsersCommand(currUsers)
      })
    })()
    join(loginUser.uuid)

    const subsLeave = (async () => {
      const obs = await onLeave()
      return obs.subscribe(async () => {
        const currUsers = await fetchChatUsers()
        setChatUsersCommand(currUsers)
      })
    })()

    return () => {
      leave(loginUser.uuid)
      async function unsubs() {
        ;((await subsJoin) as Subscription).unsubscribe()
        ;((await subsLeave) as Subscription).unsubscribe()
      }
      unsubs()
    }
  }, [])
  return (
    <div className="container bootdey">
      <div className="col-md-12 bootstrap snippets">
        <div className="container">
          <div className="content-wrapper">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card m-0">
                  <div className="row no-gutters">
                    <Users chatUsers={users.filter((user) => chatUsers.includes(user.uuid))} />
                    <Chat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ChatPage
