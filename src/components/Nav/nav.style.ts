import styled from '@emotion/styled'

export const Header = styled.header`
  width: 100%;
  height: 59px;
  background: #000;
  border-bottom: 7px solid #ff6932;
`

export const Container = styled.nav`
  display: flex;
  width: 990px;
  height: 40px;
  line-height: 40px;
  margin: 0 30px;
  padding-top: 20px;

  nav {
    ul {
      display: flex;
    }

    ul li {
      display: inline-block;
      list-style: none;
      padding: 0 30px;
      cursor: pointer;
      color: #fff;

      > a {
        color: #fff;
        text-decoration: none;
      }

      .active {
        color: #ed4441;
      }
    }
  }
`

export const Logo = styled.div`
  margin-right: 100px;

  img {
    width: 139px;
  }
`

export const Slogan = styled.div`
  margin: 0 30px 40px;
  color: #53585f;
`

export default {
  Container,
  Header,
  Logo,
  Slogan
}
