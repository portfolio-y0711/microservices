import React from 'react'
import Carousel from './LoginCarousel'

interface LoginProps {
  setLoginModalRef: (loginModalRef: HTMLDivElement) => void
}

class Login extends React.Component<LoginProps> {
  modalRef: HTMLDivElement

  componentDidMount() {
    this.props.setLoginModalRef(this.modalRef)
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary hidden"
          type="button"
          data-toggle="modal"
          data-target="#login"
        >
          HiddenButton
        </button>
        <div
          ref={(ref) => (this.modalRef = ref)}
          className="modal modal-center fade"
          id="login"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="my80sizeCenterModalLabel"
        >
          <div className="modal-dialog modal-80size modal-center" role="document">
            <div className="modal-content modal-80size">
              <div className="modal-header">
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="myModalLabel"></h4>
              </div>

              <div id="modal-body" className="modal-body">
                <Carousel />
              </div>

              <div className="modal-footer">
                <button className="btn btn-default" type="button" data-dismiss="modal">
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
