/**
 * App - this component should be around all the pages.
 */
import React, { useState, useEffect, ReactNode } from 'react'
import ErrorBoundray from '../ErrorBoundray'

export const Permission = React.createContext([])

type TProps = {
  children: ReactNode[]
}

const App = (props: TProps) => {
  const { children } = props
  const [rootPermission, setRootPermission] = useState([])

  useEffect(() => {
    // 获取权限列表
    // getRootPermission
    setRootPermission(['admin/login', 'admin/register'])
  }, [])

  return (
    <Permission.Provider value={rootPermission}>
      <ErrorBoundray>{children}</ErrorBoundray>
    </Permission.Provider>
  )
}

export default App
