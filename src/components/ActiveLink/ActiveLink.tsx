/**
 * @name ActiveLink
 * @desc next/Link 的基础上增加了 active 功能
 * @see https://github.com/vercel/next.js/tree/canary/examples/active-class-name
 */

// TODO: 增加权限校验
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

type TProps = {
  activeClassName: string
  children: JSX.Element | string
  href: string
  as?: string
}

const AcitveLink = ({ children, activeClassName, ...props }: TProps) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  )
}

AcitveLink.defaultProps = {
  as: ''
}

export default AcitveLink
