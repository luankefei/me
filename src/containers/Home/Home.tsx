import Head from 'next/head'
import {
  Container,
  Main,
  Header,
  Footer,
  Nav,
  Logo,
  Slogan,
  Carousel,
  RecommendAside,
  Waterfall
} from './home.style'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Sunken.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <div>
          <Logo>
            <img src="/static/images/logo.png" alt="sunken.me" />
          </Logo>
          <Slogan>想法、层次、评论、戏剧性、流言</Slogan>
        </div>
        <Nav>
          <ul>
            <li>首页</li>
            <li>菜谱</li>
            <li>点评</li>
            <li>跑步</li>
            <li>技术</li>
            <li>关于</li>
          </ul>
        </Nav>
      </Header>

      <Main>
        <div className="top">
          <Carousel />
          <RecommendAside />
        </div>
        <div className="bottom">
          <Waterfall />
          <Waterfall />
          <Waterfall />
          <Waterfall />
          <Waterfall />
          <Waterfall />
          <Waterfall />
          <Waterfall />
          <Waterfall />
        </div>
      </Main>

      <Footer>
        <span>design by sunken, all rights reserved</span>
        <a href="/about">关于我</a>
        <a href="https://github.com/luankefei">作品展示</a>
      </Footer>
    </Container>
  )
}
