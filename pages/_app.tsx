import { globalStyles } from '../styles/globals'

const App = ({ Component, pageProps }: any) => (
  <>
    {globalStyles}
    <Component {...pageProps} />
  </>
)

export default App
