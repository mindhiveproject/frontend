import styled from "styled-components";

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
  min-width: 250px;
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
  .card-information {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    grid-gap: 10px;
    align-items: baseline;
    .info-assigned-container {
      display: grid;
      justify-items: baseline;
      grid-gap: 5px;
    }
    .info-assigned {
      display: grid;
      align-items: center;
      color: #666666;
      background: #ffffff;
      border: 1px solid #e6e6e6;
      box-sizing: border-box;
      border-radius: 60px;
      font-family: Lato;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.05em;
      padding: 1px 7px 1px 7px;
    }
    .info-status {
      width: fit-content;
      display: grid;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid transparent;
      border-radius: 60px;
      font-family: Lato;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.05em;
      padding: 1px 7px 1px 7px;
    }
    .status-not-started {
      color: #d53533;
      background: rgba(224, 103, 102, 0.2);
    }
    .status-started {
      color: #0085bc;
      background: rgba(81, 202, 252, 0.2);
    }
    .status-on-hold {
      color: #bb6900;
      background: rgba(254, 210, 79, 0.2);
    }
    .status-completed {
      color: #007c70;
      background: rgba(48, 213, 192, 0.2);
    }
    .status-closed {
      color: #3900bd;
      background: rgba(155, 113, 252, 0.2);
    }
  }
`;
