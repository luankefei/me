/**
 * App - this component should be around all the pages.
 */
import React, { ReactNode } from 'react'
import ErrorBoundray from '../ErrorBoundray'
import AuthProvider from '../../context/auth.context'
import Layout from '../../components/Layout'

type TProps = {
  children: ReactNode[] | ReactNode
}

const App = (props: TProps) => {
  const { children } = props
  // const [permissionList, setPermissionList] = useState([])

  // useEffect(() => {
  //   // 获取权限列表
  //   // getRootPermission
  //   setPermissionList(['admin/login', 'admin/register'])
  // }, [])

  return (
    <AuthProvider>
      <ErrorBoundray>
        <Layout>{children}</Layout>
      </ErrorBoundray>
    </AuthProvider>
  )
}

export default App
