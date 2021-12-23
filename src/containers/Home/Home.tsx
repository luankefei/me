import { useEffect, useState } from 'react'
import Head from 'next/head'
// import Calendar from '../../components/Calendar/Calendar'

import { Container, Main, Header, Footer, Nav, Logo, Slogan, Carousel, RecommendAside, Waterfall } from './home.style'

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [screenWidth])

  const renderWaterFall = () => {
    const padding = screenWidth > 660 ? 300 : 20
    const sliceWidth = 352
    const rowLimit = Math.floor((screenWidth - padding) / sliceWidth)

    return rowLimit > 0
      ? new Array(rowLimit).fill(null).map((_, index) => <Waterfall key={`waterfall_${index}`} />)
      : []
  }

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
        <div className="bottom">{renderWaterFall()}</div>
      </Main>

      {/* <Calendar /> */}

      <Footer>
        <span>design by sunken, all rights reserved</span>
        <a href="/about">关于我</a>
        <a href="https://github.com/luankefei">作品展示</a>
      </Footer>
    </Container>
  )
}
