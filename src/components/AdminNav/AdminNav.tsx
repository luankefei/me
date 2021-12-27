import AcitveLink from '../ActiveLink/ActiveLink'
import { Header, Nav, User } from './admin-nav.style'

const AdminNav = () => {
  console.log('hehe')

  return (
    <Header>
      <div className="logo">管理后台</div>
      <Nav>
        <ul>
          <li>
            <AcitveLink activeClassName="active" href="/admin/login">
              <span>登录</span>
            </AcitveLink>
          </li>
          <li>
            <AcitveLink activeClassName="active" href="/admin/asset">
              <span>素材</span>
            </AcitveLink>
          </li>
          <li>
            {' '}
            <AcitveLink activeClassName="active" href="/admin/content">
              <span>内容</span>
            </AcitveLink>
          </li>
        </ul>
      </Nav>
      <User>
        <span>马拉非</span>
        <img
          className="avatar"
          src="https://imgxiaolai.laiye.com/uQ7jAnAO4nMgjOSU6rtM3ZAPrR3DENNM9R7iaUicGO6js7PUfGH145pf23Twswqh370RJTpam9uBvuUC4blCpjaw.jpeg"
          alt="avatar"
        />
      </User>
    </Header>
  )
}

export default AdminNav