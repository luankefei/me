import {
  useState,
  // useEffect,
  useRef
} from 'react'
import { Container, Login, ErrorMessage } from './login.style'
// import fetch from 'unfetch'

import AdminNav from '../../components/AdminNav'

// const HOST = 'http://114.55.42.131'

const Admin = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const usernameField = useRef(null)
  const passwordField = useRef(null)

  const doLogin = () => {
    const name = usernameField.current.value
    const password = passwordField.current.value

    if (name === '' || password === '') {
      setErrorMessage('用户名或密码不正确')
    } else if (errorMessage !== '') {
      setErrorMessage('')

      // do login
    }
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
            <input type="password" ref={passwordField} />
          </dd>
        </dl>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <button type="submit" onClick={doLogin}>
          登录
        </button>
      </Login>
    </Container>
  )
}

export default Admin
