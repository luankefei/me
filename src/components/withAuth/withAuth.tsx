import { AuthContext } from '../../context/auth.context'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// @see https://github.com/vercel/next.js/pull/31376/files
// const withAuth = (pageName: string) => {
const withAuth = (WrappedComponent) => {
  const innerAuth = (props) => {
    const PermissionDenied = () => <div>没有权限，请联系管理员开通权限！</div>
    // 匹配权限
    const matchPermission = (value) =>
      typeof value === 'string' ? <WrappedComponent {...props} /> : <PermissionDenied />
    return <AuthContext.Consumer>{(value) => matchPermission(value)}</AuthContext.Consumer>
  }

  innerAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`
  return innerAuth
}

// return innerAuth
// }

export default withAuth
