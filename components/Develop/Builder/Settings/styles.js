import styled from 'styled-components';

export const StyledSettings = styled.div`
  display: grid;
  align-content: baseline;
  grid-gap: 18px;
  background: #f4f5f5;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
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
    grid-template-columns: 1fr 1fr;
    margin: 10px 6px 10px 6px !important;
    cursor: pointer;

    .menuTitle {
      h1 {
        color: lightgrey;
      }
      padding-bottom: 10px !important;
      display: grid;
      justify-content: center;
      border-bottom: 2px solid #e6e6e6;
      p {
        font-size: 18px;
      }
    }
    .selectedMenuTitle {
      h1 {
        color: black;
      }
      border-bottom: 4px solid #ffc107 !important;
      p {
        color: #1a1a1a;
      }
    }
  }
`;
