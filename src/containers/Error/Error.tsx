import { Component, ErrorInfo } from 'react'

import { ErrorPage } from './error.style'

type TProps = {
  children: any
}

type TState = {
  hasError: boolean
  errorInfo: ErrorInfo
}

class Error extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)

    this.state = {
      hasError: false,
      errorInfo: null
    }
  }

  componentDidCatch(error: globalThis.Error, errorInfo: ErrorInfo): void {
    console.log('error page', error)

    this.setState({
      errorInfo,
      hasError: true
    })

    // log.send('error_boundary', {
    //   error,
    //   info,
    //   errorStr: JSON.stringify(error),
    //   infoStr: JSON.stringify(info)
    // })
  }

  render() {
    const { hasError, errorInfo } = this.state
    const { children } = this.props

    return hasError ? (
      <ErrorPage>
        <div>{errorInfo.componentStack}</div>
        <img alt="qrcode" src="../../static/sign-v2/images/youjiang/gzh_qrcode.png" />
        <div>好像出了点问题，页面空空如也</div>
      </ErrorPage>
    ) : (
      children
    )
  }
}

export default Error
