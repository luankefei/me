import { useState, useEffect, useRef } from 'react'

import AdminNav from '../../components/AdminNav'
import { Container, RegisterForm, ErrorMessage } from './register.style'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const usernameField = useRef(null)
  const passwordField = useRef(null)

  useEffect(() => {
    setErrorMessage('测试文字')
  }, [])

  return (
    <Container>
      <AdminNav />
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
            <input type="password" ref={passwordField} />
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
            <input type="password" ref={passwordField} />
          </dd>
        </dl>
        <dl>
          <dt>头像链接</dt>
          <dd>
            <input type="password" ref={passwordField} />
          </dd>
        </dl>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <button type="submit">注册</button>
      </RegisterForm>
    </Container>
  )
}

export default Register
