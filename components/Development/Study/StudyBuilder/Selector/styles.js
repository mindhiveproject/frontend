import styled from 'styled-components';

export const StyledTaskCard = styled.div`
  display: grid;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK' ? '#64c9e2' : '#28619e'};
  padding: 16px;
  margin-bottom: 10px;
  .cardHeader {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: end;
    button {
      width: 35px;
      height: 35px;
      text-align: center;
      border-radius: 20px;
    }
  }
  .cardButtons {
    display: grid;
    align-items: center;
    justify-items: start;
    grid-template-columns: 150px auto;
    grid-gap: 10px;
    a {
      cursor: pointer;
      text-decoration-line: underline;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.04em;
      text-align: center;
    }
  }
`;
