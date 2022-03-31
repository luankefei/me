import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectUserList } from '../admin.selector'
import { actions } from '../admin.reducer'

import withAuth from '../../components/withAuth'
import AdminNav from '../../components/AdminNav'
import { Container, RegisterForm, ErrorMessage, UserInfo, RegisterWrapper } from './register.style'

type IProps = {
  userList: any[]
  createUser: (user: any) => Promise<any>
  getUserList: () => Promise<any>
}

const Register = (props: IProps) => {
  const { userList, getUserList, createUser } = props
  console.log('userList: ', userList, props)

  const [errorMessage, setErrorMessage] = useState('')
  const usernameField = useRef(null)
  const nicknameField = useRef(null)
  const emailField = useRef(null)
  const passwordField = useRef(null)
  const repassField = useRef(null)
  const avatarField = useRef(null)

  useEffect(() => {
    getUserList()
    // .then((res) => {
    //   console.log('after getUserList', res)
    // })
  }, [])

  const doRegister = () => {
    const username = usernameField.current.value
    const nickname = nicknameField.current.value
    const email = emailField.current.value
    const password = passwordField.current.value
    const repass = repassField.current.value
    const avatar = avatarField.current.value

    if (username === '' || password === '' || nickname === '' || email === '')
      return setErrorMessage('用户名、密码、邮件和昵称不能为空')
    if (password !== repass) return setErrorMessage('两次输入密码不一致')

    const user = {
      username,
      nickname,
      password,
      avatar,
      email
    }

    return createUser(user).then((res) => console.log('doRegister', res))
  }

  return (
    <Container>
      <AdminNav />
      <RegisterWrapper>
        <RegisterForm>
          <dl>
            <dt>用户名</dt>
            <dd>
              <input ref={usernameField} />
            </dd>
          </dl>
          <dl>
            <dt>昵称</dt>
            <dd>
              <input ref={nicknameField} />
            </dd>
          </dl>
          <dl>
            <dt>电子邮箱</dt>
            <dd>
              <input ref={emailField} />
            </dd>
          </dl>
          <dl>
            <dt>密码</dt>
            <dd>
              <input type="password" ref={passwordField} />
            </dd>
          </dl>
          <dl>
            <dt>重复密码</dt>
            <dd>
              <input type="password" ref={repassField} />
            </dd>
          </dl>
          <dl>
            <dt>头像链接</dt>
            <dd>
              <input ref={avatarField} />
            </dd>
          </dl>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <button type="button" onClick={doRegister}>
            注册
          </button>
        </RegisterForm>
        <UserInfo>
          <pre>{JSON.stringify(userList, null, 4)}</pre>
        </UserInfo>
      </RegisterWrapper>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList()
})

const mapDispatchToProps = {
  createUser: actions.createUser,
  getUserList: actions.getUserList
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(withAuth(Register))

// export default Register
