import { css, Global } from '@emotion/react'

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        height: 100%;
        width: 100%;
        line-height: 1;
        -webkit-overflow-scrolling: touch;
        margin: 0;
      }

      body {
        font-family: 'PingFangSC', 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: none;
        -webkit-touch-callout: none;
      }

      body.fontLoaded {
        font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;
      }

      #app {
        background-color: #f6f6f6;
        min-height: 100%;
        min-width: 100%;
        color: #333;
      }

      p,
      label {
        line-height: inherit;
      }

      p,
      dl,
      dd {
        margin: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        font-weight: normal;
      }

      button,
      textarea,
      input {
        outline: none;
        border: none;
        padding: 0;
        -webkit-tap-highlight-color: transparent;
      }

      ul {
        padding: 0;
        margin: 0;
      }

      li {
        list-style: none;
      }
    `}
  />
)

export default {
  globalStyles
}
