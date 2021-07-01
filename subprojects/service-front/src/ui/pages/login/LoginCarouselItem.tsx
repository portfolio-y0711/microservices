import React, { useContext, useState, useRef, useEffect } from 'react'
import { RootContext } from 'store/rootModelStore'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

interface CarouselUserItemProps {
  // selected_user: number
}

// const CarouselUserItem: React.FC<CarouselUserItemProps> = observer(({ selected_user }) => {
const CarouselUserItem: React.FC<CarouselUserItemProps> = observer(() => {
  const [pass, form] = [useRef(), useRef()]

  const {
    authModel: { loginAction },
    uiModel: { setLoginModalRef, selectedLoginUser },
  } = useContext(RootContext)

  const [[show, setShow], [loginFailed, setLoginFailed], [redirect, setRedirect]] = [
    useState(false),
    useState(false),
    useState(null),
  ]

  const showPassword = () => (
    setShow(!show), ((pass.current as HTMLInputElement).type = show ? 'password' : 'text')
  )

  const processLogin = async (form: HTMLFormElement) => {
    const id = (form.elements as any)['id'].value
    const pass = (form.elements as any)['password'].value
    return await loginAction({ uuid: id, password: pass })
  }

  useEffect(() => {
    $('input#password').attr('value', selectedLoginUser.name)
  })

  return !redirect ? (
    <div>
      <img className="profile-img" src={`img/${selectedLoginUser.img}.png`} />
      <p className="profile-name">{selectedLoginUser.name}</p>
      <span className="profile-email">{selectedLoginUser.name.toLowerCase()}@gmail.com</span>
      <form ref={form} name="loginform" className="form-signin">
        <input type="hidden" name="id" value={selectedLoginUser.uuid} />
        <input ref={pass} type="password" id="password" name="password" />
        <input
          onChange={showPassword}
          style={{ margin: '10px 10px 10px 10px' }}
          type="checkbox"
          name="showPassword"
          value=""
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={async (e) => {
            e.preventDefault()
            if (await processLogin(form.current)) {
              $('button[data-dismiss="modal"]').trigger('click')
              setLoginModalRef(null)
              // history.push('/')
              setRedirect('/')
            } else {
              setLoginFailed(true)
            }
          }}
        >
          Sign in
        </button>
        {loginFailed ? 'login failed' : ''}
        <a href="#" className="need-help">
          Need help?{' '}
        </a>
        <span className="clearfix"></span>
      </form>
      <a href="#" className="text-center new-account">
        Sign in with a different account
      </a>
    </div>
  ) : (
    <>
      <Redirect to={redirect} />
    </>
  )
})

export default CarouselUserItem
