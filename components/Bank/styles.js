import styled from 'styled-components';

export const StyledBank = styled.div`
  display: grid;
`;

export const StyledStudyCard = styled.div`
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  height: 100%;
  position: relative;

  .tempOverlay {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    .studyAdmin {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1rem;
      padding: 15px;
      border-radius: 10px;
      justify-items: center;
      font-size: 1rem;
      background: #ffffffb3;
      .message {
        text-align: center;
      }
    }
  }

  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }

  .clickableWrapper {
    display: grid;
    cursor: pointer;
    height: 100%;
  }

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
    align-content: space-between;
    padding: 16px;
    grid-gap: 2rem;
    height: 100%;

    .studyMain {
      display: grid;
      grid-gap: 2rem;
      min-height: 260px;
      align-content: baseline;
      .studyParticipants {
        padding: 0.5rem 1rem;
        background: #e6f2f1;
        color: #007c70;
        border-radius: 2rem;
        width: fit-content;
        font-size: 12px;
        font-weight: bold;
      }
    }

    .studyCreatedBy {
      display: grid;
      grid-gap: 1rem;
      .studyCreatedByHeader {
        display: grid;
        font-family: Lato;
        font-weight: bold;
        font-size: 10px;
        line-height: 0px;
        color: #666666;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
      }
      .studyCreatedByPanel {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-gap: 1rem;
        padding: 2rem;
        background: #f7f9f8;
        border-radius: 10px;
        .studyCreatedBySection {
          display: grid;
          grid-gap: 1rem;
          justify-items: center;
          .studyCreatedByNumber {
            font-family: Lato;
            font-weight: bold;
            font-size: 14px;
            color: #000000;
          }
        }
      }
    }
  }

  a {
    letter-spacing: 0.04em;
    text-decoration-line: underline;
    color: #007c70;
  }
  h2 {
    font-family: Lato;
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
    align-items: end;
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
