import styled from 'styled-components';

export const StyledDocumentPage = styled.div`
  display: grid;
  max-width: 800px;
  margin: 2rem auto;
  padding: 3rem;
  min-height: 800px;

  p,
  li {
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #666666;
  }

  h1 {
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 56px;
    color: #1a1a1a;
  }

  h2 {
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #1a1a1a;
  }

  h3 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 32px;
    color: #1a1a1a;
  }

  a {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #007c70;
  }

  .contents {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(11, 1fr);
    grid-column-gap: 30px;
    @media (max-width: 600px) {
      width: 300px;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;
