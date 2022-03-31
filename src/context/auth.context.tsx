import React, { useState, useEffect } from 'react'

type TProps = {
  children: JSX.Element
}

const AuthContext = React.createContext('')

const AuthProvider = (props: TProps) => {
  const { children } = props
  const [auth, setAuth] = useState('')

  useEffect(() => {
    setAuth(sessionStorage.getItem('auth'))
  }, [])
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider
