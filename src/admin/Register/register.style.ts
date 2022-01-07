import styled from '@emotion/styled'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  height: 100%;
  margin: 0;
  padding: 0;
`

export const RegisterWrapper = styled.div`
  display: flex;
  height: 100%;
`

export const RegisterForm = styled.form`
  padding: 100px 100px 100px 70px;
  font-size: 16px;
  width: 500px;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 3px 3px 6px 1px #eee;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;

  input {
    width: 100%;
    height: 30px;
    padding: 2px 6px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  dl {
    margin-bottom: 20px;
    height: 30px;
    line-height: 30px;
  }

  dt {
    float: left;
    width: 80px;
    text-align: right;
  }

  dd {
    padding-left: 100px;
    text-align: left;
  }

  button {
    margin: 20px auto 0;
    height: 30px;
    background: #ed4441;
    color: #fff;
    width: 120px;
  }
`

export const ErrorMessage = styled.div`
  color: #ed4441;
  height: 20px;
  line-height: 20px;
`

export const UserInfo = styled.div`
  padding: 100px 100px 100px 70px;
  font-size: 16px;
`

export default { Container, RegisterForm, ErrorMessage }
