import React, { ReactNode } from 'react'
import Nav from '../Nav'

type TProps = {
  children: ReactNode[] | ReactNode
}

const Layout = ({ children }: TProps) => (
  <div>
    <Nav />
    {children}
  </div>
)

export default Layout
