import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectUserList } from './selector'
import { actions } from './reducer'
import AdminNav from '../../components/AdminNav'
import { Container, RegisterForm, ErrorMessage, UserInfo, RegisterWrapper } from './register.style'

type IProps = {
  userList: any[]
  getUserList: () => Promise<any>
}

const Register = (props: IProps) => {
  const { userList, getUserList } = props
  console.log('userList: ', userList, props)

  const [errorMessage, setErrorMessage] = useState('')
  const usernameField = useRef(null)
  const nicknameField = useRef(null)
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
    const password = passwordField.current.value
    const repass = repassField.current.value
    const avatar = avatarField.current.value

    if (username === '' || password === '' || nickname === '') return setErrorMessage('用户名、密码和昵称不能为空')
    if (password !== repass) return setErrorMessage('两次输入密码不一致')

    const user = {
      username,
      nickname,
      password,
      avatar
    }

    console.log('生成用户', user)
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
              <input type="password" ref={nicknameField} />
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
              <input type="password" ref={avatarField} />
            </dd>
          </dl>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <button type="button" onClick={doRegister}>
            注册
          </button>
        </RegisterForm>
        <UserInfo>{JSON.stringify(userList, null, 4)}</UserInfo>
      </RegisterWrapper>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList()
})

const mapDispatchToProps = {
  getUserList: actions.getUserList
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(Register)

// export default Register
