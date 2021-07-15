import { KeyboardEvent, useEffect, useRef, useContext, MouseEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { Subscription } from 'rxjs'

import Message from './Message'
import { RootServiceContext } from 'store'
import { RootContext } from 'store'

const Chat = observer(() => {
  const {
    socketChatService: { 
      onMessages,
      send
     },
    apiChatService: { 
      fetchChatMessages 
    },
  } = useContext(RootServiceContext)
  const {
    chatModel: { messages, 
      setMessageCommand 
    },
    usersModel: { loginUser },
  } = useContext(RootContext)

  const inputRef: React.LegacyRef<HTMLTextAreaElement> = useRef(null)
  const newMessage = useRef({
    img: loginUser.img,
    uuid: loginUser.uuid,
    name: loginUser.name,
    msg: '',
  })

  useEffect(() => {
    const subsMessages = (async () => {
      const obs = await onMessages()
      return obs.subscribe(async (_) => {
        const messages = await fetchChatMessages()
        setMessageCommand(messages)
      })
    })()
    // const subsMessage = (async () => {
    //   const obs = await onMessage()
    //   return obs.subscribe((m: ChatMessage) => {
    //     messages.push(m)
    //     setMessageCommand(messages)
    //   })
    // })()

    inputRef.current.focus()

    return function cleanup() {
      async function unsubs() {
        ;((await subsMessages) as Subscription).unsubscribe()
      }
      unsubs()
    }
  })
  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    inputRef.current!.value = e.target.value
  }

  const sendMessage = (e?: MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current!.value.trim() == '') {
      return
    }
    let _msg
    if (!inputRef.current!.value.includes('\n')) {
      _msg = inputRef.current!.value.split('\n').map((x) => x.trim())
    } else {
      _msg = [inputRef.current!.value.split('\n')]
    }

    newMessage.current = {
      img: loginUser.img,
      uuid: loginUser.uuid,
      name: loginUser.name,
      msg: _msg,
    }
    send(newMessage.current)
    inputRef.current!.value = ''
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter') {
      if (!e!.shiftKey) {
        sendMessage()
      }
    }
  }
  return (
    <>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div className="selected-user">
          <span>
            To: <span className="name">Everyone</span>
          </span>
        </div>
        <div className="chat-container">
          <ul className="chat-box chatContainerScroll">
            {messages.map((user, index) => {
              return <Message key={index} user={user} />
            })}
          </ul>

          <div className="form-group mt-3 mb-0">
            <textarea
              ref={inputRef}
              onChange={updateInput}
              onKeyPress={handleKeyPress}
              style={{ resize: 'none' }}
              className="form-control"
              rows={3}
              placeholder="Type your message here..."
            />
            <div
              style={{
                marginTop: '3px',
              }}
            />
            <button
              className="btn btn-primary"
              onClick={sendMessage}
              style={{
                width: '100%',
              }}
              type="button"
            >
              <i className="fas fa-pencil-alt fa-fw"></i>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  )
})

export default Chat
