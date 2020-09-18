import styled from 'styled-components';

export const StyledFooter = styled.div`
  display: grid;
  align-content: center;
  min-height: 489px;
  grid-area: footer;
  background: #052c39;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .infoPanel {
    display: grid;
    max-width: 374px;
    margin: 0 auto;
    justify-content: center;
    @media (max-width: 500px) {
      justify-content: start;
      margin: 10px;
    }
  }
  .linksPanel {
    display: grid;
    justify-content: center;
    @media (max-width: 500px) {
      justify-content: start;
      margin: 10px;
    }
  }
  .link {
    cursor: pointer;
  }
`;
