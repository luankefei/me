import { AuthContext } from '../../context/auth.context'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// @see https://github.com/vercel/next.js/pull/31376/files
const withAuth = (pageName: string) => {
  const innerAuth = (WrappedComponent) => {
    const WithAuth = (props) => {
      const PermissionDenied = () => <div>没有权限，请联系管理员开通权限！</div>
      // 匹配权限
      const matchPermission = (value, list) =>
        list.indexOf(value) !== -1 ? <WrappedComponent {...props} /> : <PermissionDenied />
      return (
        <AuthContext.Consumer>{(permissionList) => matchPermission(pageName, permissionList)}</AuthContext.Consumer>
      )
    }

    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`
    return WithAuth
  }

  return innerAuth
}

export default withAuth
