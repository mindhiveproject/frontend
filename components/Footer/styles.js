import styled from 'styled-components';

export const StyledFooter = styled.div`
  display: grid;
  grid-area: footer;

  background: #052c39;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: stretch;
  @media (max-width: 375px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .infoPanel {
    /* display: grid; */
    padding: 50px;
  }
  .linksPanel {
    /* display: grid; */
    padding: 50px;
  }
`;
