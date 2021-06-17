import styled from '@emotion/styled'

export const Container = styled.div`
  min-height: 100vh;
  padding: 0;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`

export const Header = styled.header`
  width: 100%;

  > nav {
    height: 40px;
    line-height: 40px;
    // background: #545651;
    // color: #fff;
  }
`

export const Nav = styled.nav`
  height: 40px;
  border-top: 1px solid #dcdee0;
  border-bottom: 1px solid #dcdee0;
  line-height: 30px;
  color: #53585f;

  ul {
    display: flex;
  }

  ul li {
    list-style: none;
    display: inline-block;
    padding: 0 30px;
  }
`

export const Logo = styled.div`
  padding: 50px 30px 30px;
`

export const Slogan = styled.div`
  margin: 0 30px 40px;
  color: #53585f;
`

export const Main = styled.div`
  // padding: 5rem 0;
  // flex: 1;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`

export const Carousel = styled.div`
  background: #f5f5f5;
  width: 700px;
  height: 300px;
  margin: 30px;
`

export const Footer = styled.div`
  border-top: 1px solid #eaeaea;
  text-align: right;
  height: 70px;
  padding: 10px 30px;

  > * {
    line-height: 24px;
  }

  > span {
    float: left;
    color: #53585f;
  }

  > a {
    color: #ed4441;
    padding-left: 10px;
    padding-right: 10px;
  }

  > a:last-child {
    padding-right: 0;
  }
`

// .title a {
//   color: #0070f3;
//   text-decoration: none;
// }

// .title a:hover,
// .title a:focus,
// .title a:active {
//   text-decoration: underline;
// }

// .title {
//   margin: 0;
//   line-height: 1.15;
//   font-size: 4rem;
// }

// .title,
// .description {
//   text-align: center;
// }

// .description {
//   line-height: 1.5;
//   font-size: 1.5rem;
// }

// .code {
//   background: #fafafa;
//   border-radius: 5px;
//   padding: 0.75rem;
//   font-size: 1.1rem;
//   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
//     Bitstream Vera Sans Mono, Courier New, monospace;
// }

// .grid {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   max-width: 800px;
//   margin-top: 3rem;
// }

// .card {
//   margin: 1rem;
//   flex-basis: 45%;
//   padding: 1.5rem;
//   text-align: left;
//   color: inherit;
//   text-decoration: none;
//   border: 1px solid #eaeaea;
//   border-radius: 10px;
//   transition: color 0.15s ease, border-color 0.15s ease;
// }

// .card:hover,
// .card:focus,
// .card:active {
//   color: #0070f3;
//   border-color: #0070f3;
// }

// .card h3 {
//   margin: 0 0 1rem 0;
//   font-size: 1.5rem;
// }

// .card p {
//   margin: 0;
//   font-size: 1.25rem;
//   line-height: 1.5;
// }

// .logo {
//   height: 1em;
// }

// @media (max-width: 600px) {
//   .grid {
//     width: 100%;
//     flex-direction: column;
//   }
// }
