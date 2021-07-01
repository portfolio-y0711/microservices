import React, { FunctionComponent } from 'react'

export const createChatMessage = (date: string, time: string) => (Component) => {
  const ChatMessageBox: React.FC<{
    date: string
    time: string
    Component: FunctionComponent
  }> = ({ date, time, Component }) => {
    return (
      <>
        <div className="chat-box-single-line">
          <abbr className="timestamp">{date}</abbr>
        </div>

        <div className="direct-chat-text">
          <Component />
        </div>

        <div className="direct-chat-info clearfix">
          <span className="direct-chat-timestamp pull-right">{time}</span>
        </div>
      </>
    )
  }
  return <ChatMessageBox {...{ date, time, Component }} />
}
