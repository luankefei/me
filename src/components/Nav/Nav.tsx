import ActiveLink from '../ActiveLink'
import {
  Header,
  Logo,
  Container
  // Slogan,
} from './nav.style'

const Nav = () => (
  <Header>
    <Container>
      <Logo>
        <img src="/static/images/logo.png" alt="sunken.me" />
      </Logo>
      {/* <Slogan>想法、层次、评论、戏剧性、流言</Slogan> */}
      <nav>
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
      </nav>
    </Container>
  </Header>
)

export default Nav
