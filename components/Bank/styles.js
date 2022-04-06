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

  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }

  .clickableWrapper {
    cursor: pointer;
  }

  .studyImage {
    height: 166px;
    position: relative;
    :hover {
      .archiveButton {
        display: inline-block;
      }
    }
  }
  .archiveButton {
    position:absolute;
    top: 10%;
    left: 85%;
    display: none;
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
    align-content: baseline;
    padding: 16px;
    grid-gap: 2rem;

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
        grid-template-columns: 1fr 1fr 1fr;
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

  .studyAdmin {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    padding: 16px;
    align-items: end;
    font-size: 1rem;
    border-top: 1px solid lightgrey;
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

export const StyledFeaturedStudyCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  width: 100%;
  height: 100%;

  .cardInfo {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-gap: 1rem;
    align-content: baseline;
    grid-gap: 2rem;
    height: 100%;

    .cardMain {
      display: grid;
      grid-gap: 2rem;
      align-content: baseline;
      .studyFeatured {
        display: grid;
        font-family: Lato;
        font-weight: bold;
        font-size: 10px;
        line-height: 0px;
        color: #666666;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
      }
    }

    .studyLink {
      display: grid;
      width: fit-content;
      button {
        min-height: 56px;
        padding: 10px 24px 10px 24px;
        background: white;
        border: 2px solid #007c70;
        box-sizing: border-box;
        border-radius: 4px;
        color: #007c70;
        cursor: pointer;
        font-family: 'Lato';
      }
    }
  }

  .studyImage {
    .noImage {
      width: 100%;
      height: 100%;
      background: lightgrey;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
`;
