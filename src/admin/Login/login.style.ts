import styled from '@emotion/styled'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://imgxiaolai.laiye.com/material_20211227103821_4MHHplajV5.jpg);
  background-size: auto 100%;
  background-position: center;
  height: 100%;
  margin: 0;
  padding: 0;
`

const Login = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  font-size: 16px;
  width: 300px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 3px 3px 6px 1px #eee;
  border-radius: 8px;
  text-align: center;

  input {
    width: 230px;
    height: 30px;
    padding: 2px 6px;
    box-sizing: border-box;
  }

  dl {
    margin-bottom: 20px;
    height: 30px;
    line-height: 30px;
  }

  dt {
    float: left;
    width: 50px;
    text-align: right;
  }

  dd {
    padding-left: 70px;
  }

  button {
    margin: 20px auto 0;
    height: 30px;
    background: #ed4441;
    color: #fff;
    width: 120px;
  }
`

const ErrorMessage = styled.div`
  color: #ed4441;
  height: 20px;
  line-height: 20px;
  // background: red;
`

export {
  Container,
  Login,
  ErrorMessage
  // Editor,
  // Uploader
}
