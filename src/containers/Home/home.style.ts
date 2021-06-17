import styled from '@emotion/styled'

export const Container = styled.div`
  min-height: 100vh;
  padding: 0;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`

export const Header = styled.header`
  width: 100%;

  > nav {
    height: 40px;
    line-height: 40px;
    // background: #545651;
    // color: #fff;
  }
`

export const Nav = styled.nav`
  height: 40px;
  border-top: 1px solid #dcdee0;
  border-bottom: 1px solid #dcdee0;
  line-height: 30px;
  color: #53585f;

  ul {
    display: flex;
  }

  ul li {
    list-style: none;
    display: inline-block;
    padding: 0 30px;
  }
`

export const Logo = styled.div`
  padding: 50px 30px 30px;
`

export const Slogan = styled.div`
  margin: 0 30px 40px;
  color: #53585f;
`

export const Main = styled.div`
  // padding: 5rem 0;
  // flex: 1;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`

export const Carousel = styled.div`
  background: #f5f5f5;
  width: 700px;
  height: 300px;
  margin: 30px;
`

export const Footer = styled.div`
  border-top: 1px solid #eaeaea;
  text-align: right;
  height: 70px;
  padding: 10px 30px;

  > * {
    line-height: 24px;
  }

  > span {
    float: left;
    color: #53585f;
  }

  > a {
    color: #ed4441;
    padding-left: 10px;
    padding-right: 10px;
  }

  > a:last-child {
    padding-right: 0;
  }
`
