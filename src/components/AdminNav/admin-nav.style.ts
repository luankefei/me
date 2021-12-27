import styled from '@emotion/styled'

const Header = styled.header`
  height: 40px;
  line-height: 40px;
  background: #444;
  padding: 0 100px;

  .logo {
    float: left;
    width: 200px;
    color: #fff;
  }
`

const Nav = styled.nav`
  display: inline-block;
  width: 600px;

  ul {
    width: 600px;
    display: flex;
  }

  li {
    list-style: none;
    display: inline-block;
    padding: 0 30px;

    > span {
      color: #fff;
      text-decoration: none;
    }

    .active {
      color: #ed4441;
    }
  }
`

const User = styled.div`
  float: right;
  width: 100px;
  display: flex;
  align-items: center;

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }

  span {
    margin-right: 12px;
    color: #fff;
    font-size: 12px;
  }
`

export { Header, Nav, User }
