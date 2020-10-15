import styled from 'styled-components';

export const StyledBank = styled.div`
  display: grid;
`;

export const StyledStudyCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  overflow: hidden;
  .studyImage {
    height: 166px;
  }
  .noImage {
    background: lightgrey;
    height: 166px;
  }
  img {
    width: 100%;
    height: 166px;
    object-fit: cover;
  }
  .cardInfo {
    display: grid;
    align-items: start;
    align-content: start;
    padding: 16px;
    min-height: 314px;
    grid-template-rows: auto auto 1fr;
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
  }
  p {
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
  .studyLink {
    display: grid;
    grid-template-columns: 1fr auto;
    align-self: end;
    margin-bottom: 10px;
  }
`;

export const StyledTaskCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK' ? '#64c9e2' : '#28619e'};
  img {
    width: 100%;
    height: 166px;
    object-fit: cover;
  }
  .cardInfo {
    padding: 16px;
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
      max-width: 150px;
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
  }
`;
