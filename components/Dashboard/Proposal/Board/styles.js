import styled from 'styled-components';

export const StyledSections = styled.div``;

export const StyledNewInput = styled.div`
  display: grid;
  justify-content: start;
  text-align: start;
  margin: 10px;
  border-top: 1px solid lightgrey;
  input {
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 10px 10px 10px 10px;
    height: 50px;
  }
  span {
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
  }
  .addBtn {
    background: #ffffff;
    display: grid;
    margin-top: 10px;
    cursor: pointer;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 5px;
  }
`;

export const StyledSection = styled.div`
  display: grid;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  max-width: 300px;
  min-width: 200px;
  margin: 10px;
  .column-drag-handle {
    cursor: pointer;
    text-align: center;
    margin: 10px;
    h3 {
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0em;
      text-align: center;
    }
    span {
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
  .deleteBtn {
    display: grid;
    margin-bottom: 30px;
    cursor: pointer;
    text-align: center;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: darkred;
  }
`;

export const StyledCard = styled.div`
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  .card-drag-handle {
    display: grid;
    text-align: center;
    margin: 10px;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
  }
`;
