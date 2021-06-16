import Head from 'next/head'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sunken.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
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
      </header>

      <main className={styles.main} />

      <footer className={styles.footer}>
        <span>design by sunken, all rights reserved</span>
        {/* <a href="#">关于我</a>
        <a href="#">作品展示</a> */}
      </footer>
    </div>
  )
}
