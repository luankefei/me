import styled from '@emotion/styled'

const Container = styled.div`
  border: 1px solid red;
  padding: 20px;
`

const Summary = styled.article`
  .article-content,
  .article-list,
  .article-unordered-list {
    font-size: 14px;
    line-height: 1.4;
    padding-bottom: 20px;
  }

  .article-list {
  }

  .article-unordered-list {
  }
`

export { Container, Summary }
