import styled from 'styled-components';

export const StyledSettings = styled.div`
  display: grid;
  align-content: baseline;
  grid-gap: 18px;
  background: #f4f5f5;
  padding: 30px;
  height: 89vh;
  overflow-y: scroll;

  .card {
    display: grid;
    padding: 20px 30px;
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }
  .studyDescription {
    display: grid;
    .selector {
      margin: 10px 0px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 150%;
      color: #1a1a1a;
    }
  }

  .menu {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 40px;
    width: fit-content;
    margin: 10px 6px 10px 6px !important;
    cursor: pointer;
    h2  {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #1a1a1a;
    }

    .menuTitle {
      width: fit-content;
      padding-bottom: 10px !important;
      display: grid;
      justify-content: start;
      p {
        font-size: 18px;
      }
    }
    .selectedMenuTitle {
      border-bottom: 4px solid #ffc107 !important;
      p {
        color: #1a1a1a;
      }
    }
  }
`;
