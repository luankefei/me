import React from 'react'

type TProps = {
  children: JSX.Element
}

const authList = ['admin/login', 'admin/register', 'home']
const AuthContext = React.createContext(authList)

const AuthProvider = (props: TProps) => {
  const { children } = props
  return <AuthContext.Provider value={authList}>{children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider
