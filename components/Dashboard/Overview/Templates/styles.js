import styled from 'styled-components';

export const StyledOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  .topRow {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .searchArea {
    display: grid;
    justify-content: start;
    align-items: center;
    span {
      font-size: 18px;
    }
    input {
      font-family: Lato;
      border: 1px solid #cccccc;
      border-radius: 4px;
      width: 100%;
      font-size: 20px;
      padding: 12px;
      &:focus {
        outline: 0;
        border-color: ${props => props.theme.red};
      }
    }
  }
`;

export const StyledBank = styled.div`
  display: grid;
  padding-top: 10px;
`;

export const StyledZeroState = styled.div`
  display: grid;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  .message {
    margin-top: 180px;
    background: #fff3cd;
    border-radius: 4px;
    padding: 66px 86px 66px 86px;
  }
  h2 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-align: center !important;
  }
  p {
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-align: center !important;
  }
`;

export const StyledTaskCard = styled.div`
  background: #ffffff;
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK'
      ? '#64c9e2'
      : props.taskType === 'SURVEY'
      ? '#28619e'
      : '#ffc7c3'};

  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  cursor: pointer;

  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }

  img {
    width: 100%;
    height: 166px;
    object-fit: cover;
  }
  .cardInfo {
    padding: 16px;
    .title {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 1rem;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 20px;
      .rightSide {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: auto 1fr;
        align-items: center;
        justify-items: center;
      }
    }
  }
  a {
    letter-spacing: 0.04em;
    text-decoration-line: underline;
    color: #007c70;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    color: #1a1a1a;
    margin-bottom: 20px;
  }
  p {
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-align: left;
  }
  .actionLinks {
    margin-top: 24px;
    button {
      background: #ffffff;
      color: #007c70;
      max-width: 200px;
    }
    p {
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }
  .studyLink {
    display: grid;
    grid-template-columns: 1fr auto;
    align-self: end;
    margin-bottom: 10px;
    align-items: end;
  }
`;
