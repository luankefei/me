import {
  useState,
  // useEffect,
  useRef
} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import withAuth from '../../components/withAuth'
import AdminNav from '../../components/AdminNav'
import { actions } from '../admin.reducer'
import { makeSelectAuth, makeSelectUser } from '../admin.selector'
import { Container, LoginContainer, ErrorMessage } from './login.style'

// const HOST = 'http://114.55.42.131'

interface IProps {
  auth: string
  userInfo: any
  login: (data: { username: string; password: string }) => Promise<any>
  getUser: (userNameHash: string) => Promise<any>
}

@withAuth('admin/login')
const Login = (props: IProps) => {
  const { auth, userInfo, login, getUser } = props

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
      getUser(res.data)
      // getUser({ userNameHash: res.data }res.data, '12345')
    })
  }

  return (
    <Container>
      <AdminNav />
      <LoginContainer>
        <div>{userInfo ? JSON.stringify(userInfo) : ''}</div>
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
      </LoginContainer>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUser(),
  auth: makeSelectAuth()
})

const mapDispatchToProps = {
  login: actions.login,
  getUser: actions.getUser
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Login)
