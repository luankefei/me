import { globalStyles } from '../styles/globals'
import storeWrapper from '../src/redux/createStore'
import AppContainer from '../src/containers/App'

const App = ({ Component, pageProps }: any) => (
  <>
    {globalStyles}
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  </>
)

export default storeWrapper.withRedux(App)
