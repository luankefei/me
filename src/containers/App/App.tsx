/**
 * App - this component should be around all the pages.
 */
import React, { ReactNode } from 'react'
import ErrorBoundray from '../ErrorBoundray'
import AuthProvider from '../../context/auth.context'

type TProps = {
  children: ReactNode[]
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
      <ErrorBoundray>{children}</ErrorBoundray>
    </AuthProvider>
  )
}

export default App
