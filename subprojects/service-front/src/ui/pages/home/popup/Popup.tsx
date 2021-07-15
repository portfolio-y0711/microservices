import './Popup.css'
import React from 'react'
import BasicNotice from './notices/BasicNotice'
import { createChatMessage } from './ChatMessageBox'
import Notice0615 from './notices/Notice0615'
import Notice0616 from './notices/Notice0616'
import Notice0617 from './notices/Notice0617'
import Notice0618 from './notices/Notice0618'
import Notice0619 from './notices/Notice0619'
import Notice0624 from './notices/Notice0624'
import Notice0628 from './notices/Notice0628'
import Notice0701 from './notices/Notice0701'
import Notice0708 from './notices/Notice0708'
import Notice0715 from './notices/Notice0715'

const Popup: React.FC<{ text: string; closePopup: () => void }> = ({ text, closePopup }) => {
  return (
    <>
      <div className="popup">
        <div className="popup-box" id="qnimate">
          <span onClick={closePopup} className="close-icon">
            {' '}
            x{' '}
          </span>
          <div className="popup-head">
            <div className="popup-head-left pull-left">
              <img src="img/avatar2.png" alt="iamgurdeeposahan" />
              {`\u00A0\u00A0\u00A0\u00A0${text}`}
            </div>
          </div>
          <div className="popup-messages">
            <div className="direct-chat-messages">
              {createChatMessage('June 11th, 2021', '6:00 PM')(BasicNotice)}

              {createChatMessage('June 15th, 2021', '6:00 PM')(Notice0615)}

              {createChatMessage('June 16th, 2021', '6:00 PM')(Notice0616)}

              {createChatMessage('June 17th, 2021', '6:00 PM')(Notice0617)}

              {createChatMessage('June 18th, 2021', '6:00 PM')(Notice0618)}

              {createChatMessage('June 19th, 2021', '6:00 PM')(Notice0619)}

              {createChatMessage('June 24th, 2021', '6:00 PM')(Notice0624)}

              {createChatMessage('June 28th, 2021', '6:00 PM')(Notice0628)}

              {createChatMessage('July 1st, 2021', '6:00 PM')(Notice0701)}

              {createChatMessage('July 8th, 2021', '6:00 PM')(Notice0708)}

              {createChatMessage('July 15th, 2021', '6:00 PM')(Notice0715)}
            </div>
          </div>
          <div className="popup-messages-footer"> </div>
        </div>
      </div>
    </>
  )
  // return (
  //   <div className="popup">
  //     <div className="popup_inner">
  //       <h1>{text}</h1>
  //     </div>
  //     <span onClick={closePopup} className="close-icon">
  //       x
  //     </span>
  //   </div>
  // )
}

export default Popup
