import { useEffect, useState } from 'react'
import Head from 'next/head'

import Nav from 'src/components/Nav'
import {
  Container,
  Main,
  Footer,
  Carousel,
  RecommendAside,
  Waterfall
} from './home.style'

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
      ? new Array(rowLimit)
          .fill(null)
          .map((_, index) => <Waterfall key={`waterfall_${index}`} />)
      : []
  }

  return (
    <Container>
      <Head>
        <title>Sunken.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

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

export default Home
