import styled from '@emotion/styled'

export const Container = styled.div`
  min-height: 100vh;
  padding: 0;
`

export const Main = styled.div`
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
