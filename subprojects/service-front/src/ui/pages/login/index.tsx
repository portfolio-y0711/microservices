import { useEffect, useContext } from 'react'
import { RootContext } from 'store/rootModelStore'
import Login from './LoginModal'
import { observer } from 'mobx-react-lite'

const LoginPage = observer(() => {
  const {
    uiModel: { setLoginModalRef, loginModalRef },
  } = useContext(RootContext)

  useEffect(() => {
    if (loginModalRef) {
      ;($(loginModalRef) as any).modal('show')
    }
  })

  return (
    <>
      <Login setLoginModalRef={setLoginModalRef}></Login>
    </>
  )
})

export default LoginPage
