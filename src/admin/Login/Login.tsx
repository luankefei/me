import {
  // useState,
  // useEffect,
  useRef
} from 'react'
import { Container, Login } from './login.style'
// import fetch from 'unfetch'

import AdminNav from '../../components/AdminNav'

// const HOST = 'http://114.55.42.131'

const Admin = () => {
  const usernameField = useRef(null)
  const passwordField = useRef(null)

  const doLogin = () => {
    // const name = usernameField.current.value
    // const password = passwordField.current.value
    // if (name === 'admin' && password === `mPXFYkiaOwWWHLbYkZ0tk"tW`) {
    //   setVisible(true)
    // } else {
    //   alert('用户名或密码不正确')
    // }
  }

  return (
    <Container>
      <AdminNav />
      <Login>
        <dl>
          <dt>用户名</dt>
          <dd>
            <input ref={usernameField} />
          </dd>
        </dl>
        <dl>
          <dt>密码</dt>
          <dd>
            <input ref={passwordField} />
          </dd>
        </dl>
        <button type="submit" onClick={doLogin}>
          登录
        </button>
      </Login>
    </Container>
  )
}

export default Admin
