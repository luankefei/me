import { useEffect, useState } from 'react'
import Head from 'next/head'
import withAuth from '../../components/withAuth'
import ActiveLink from '../../components/ActiveLink'
// import Calendar from '../../components/Calendar/Calendar'

import { Container, Main, Header, Footer, Nav, Logo, Slogan, Carousel, RecommendAside, Waterfall } from './home.style'

const Home = () => {
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
            <li>
              <ActiveLink href="/" activeClassName="active">
                <span>首页</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/recipe" activeClassName="active">
                <span>菜谱</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/comment" activeClassName="active">
                <span>点评</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/running" activeClassName="active">
                <span>跑步</span>
              </ActiveLink>
            </li>
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

export default withAuth('home')(Home)
