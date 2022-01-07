import { globalStyles } from '../styles/globals'
import storeWrapper from '../src/redux/store'

const App = ({ Component, pageProps }: any) => (
  <>
    {globalStyles}
    <Component {...pageProps} />
  </>
)

export default storeWrapper.withRedux(App)
