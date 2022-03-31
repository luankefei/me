import withAuth from '../../components/withAuth'
import AdminNav from '../../components/AdminNav'
import { Container } from './recipe.style'

const Recipe = () => {
  console.log('page recipe')
  return (
    <Container>
      <AdminNav />
      <div>呵呵</div>
    </Container>
  )
}

export default withAuth(Recipe)
