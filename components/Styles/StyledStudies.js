import styled from 'styled-components';

const StyledStudiesBoard = styled.div`
  display: grid;
  width: 100%;
  justify-self: center;
  grid-gap: 3rem;
  margin: 5rem 0rem;

  @media (max-width: 1200px) {
    padding: 0rem 2rem;
  }

  .featuredHeader {
    display: grid;
    width: 100%;
    max-width: 1200px;
    justify-self: center;
  }

  .centered {
    display: grid;
    width: 100%;
    max-width: 1200px;
    justify-self: center;
  }

  .featuredContainerWrapper {
    background: #f6f9f8;
    width: 100%;
    padding: 7rem 0rem 2rem 0rem;
    @media (max-width: 1300px) {
      padding: 7rem 2rem;
    }
  }

  .featuredContainer {
    display: grid;
    width: 100%;
    max-width: 1200px;
    justify-self: center;
    min-height: 400px;
    background: #f6f9f8;
  }

  .studies {
    display: grid;
    width: 100%;
    max-width: 1200px;
    justify-self: center;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 26px;
    grid-row-gap: 26px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  h1 {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  h2 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  a {
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
  }
`;

export default StyledStudiesBoard;
