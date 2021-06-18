import Document, { Html, Head, Main, NextScript } from 'next/document'
// import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            type="text/javascript"
            src="https://imgxiaolai.laiye.com/material_20210618054316_sxeMoPLP8p.js"
            // strategy="afterInteractive"
          />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
