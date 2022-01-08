import {
  useState,
  // useEffect,
  useRef
} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import AdminNav from '../../components/AdminNav'
import { actions } from '../admin.reducer'
import { makeSelectAuth } from '../admin.selector'
import { Container, Login, ErrorMessage } from './login.style'

// const HOST = 'http://114.55.42.131'

interface IProps {
  auth: string
  login: (username: string, password: string) => Promise<any>
}

const Admin = (props: IProps) => {
  const { auth, login } = props

  console.log('admin auth', auth)

  const [errorMessage, setErrorMessage] = useState('')
  const usernameField = useRef(null)
  const passwordField = useRef(null)

  const doLogin = () => {
    const username = usernameField.current.value
    const password = passwordField.current.value

    if (username === '' || password === '') {
      setErrorMessage('用户名或密码不正确')
    } else if (errorMessage !== '') {
      setErrorMessage('')
    }

    // do login
    login({ username, password }).then((res) => {
      console.log('login success', res)
    })
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

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth()
})

const mapDispatchToProps = {
  login: actions.login
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Admin)
