import styled from 'styled-components';

export const StyledNavigation = styled.div`
  display: grid;
  .firstLine {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
    padding: 15px;
    background: #ffffff;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
    .studyTitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #1a1a1a;
    }
    .rightPanel {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: auto auto auto auto;
    }
  }
  .secondLine {
    padding: 15px;
    background: #e8ebef;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  }
`;
