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
  }
`

export const Nav = styled.nav`
  min-width: 600px;
  height: 40px;
  border-top: 1px solid #dcdee0;
  border-bottom: 1px solid #dcdee0;
  line-height: 30px;

  ul {
    display: flex;
  }

  ul li {
    list-style: none;
    display: inline-block;
    padding: 0 30px;

    > a {
      color: #53585f;
      text-decoration: none;
    }

    .active {
      color: #ed4441;
    }
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

  > .top {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    background: #f5f5f5;
  }

  > .bottom {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 50px;
  }
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

export const Carousel = styled.div`
  background-image: url(https://imgxiaolai.laiye.com/material_20211223102021_igCj0NaxTj.jpeg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
  height: 400px;
  flex: 1;
`

export const RecommendAside = styled.aside`
  width: 360px;
  height: 400px;
  background: #ccc;
  margin-left: 30px;

  @media (max-width: 900px) {
    display: none;
  }
`

export const Waterfall = styled.div`
  width: 352px;
  height: 516px;
  background: #f5f5f5;
  margin: 10px;
`
