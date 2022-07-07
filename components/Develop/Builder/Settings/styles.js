import styled from 'styled-components';

export const StyledSettings = styled.div`
  display: grid;
  align-content: baseline;
  grid-gap: 18px;
  background: #f4f5f5;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
  .menuTitle {
    h1 {
      color: lightgrey;
    }
  }
  .selectedMenuTitle {
    h1 {
      color: black;
    }
  }
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
  .addStudyBlock {
  }
`;
