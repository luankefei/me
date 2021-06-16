import Head from 'next/head'
import { Container, Main, Header, Footer } from './home.style'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Sunken.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <div>头部</div>
        <nav>
          <ul>
            <li>首页</li>
            <li>厨艺</li>
            <li>跑步</li>
            <li>技术</li>
            <li>关于</li>
          </ul>
        </nav>
      </Header>

      <Main />

      <Footer>
        <span>design by sunken, all rights reserved</span>
        {/* <a href="#">关于我</a>
        <a href="#">作品展示</a> */}
      </Footer>
    </Container>
  )
}
