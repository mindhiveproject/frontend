import styled from "styled-components";

export const StyledCollectSection = styled.div`
  background: #e5e5e5;
  display: grid;
  justify-content: stretch;
  width: 100%;

  h1 {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  h2 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  a {
    cursor: pointer;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
    text-decoration-line: underline;
  }

  .backButton {
    margin-bottom: 21px;
    padding-left: 10px;
  }
`;

export const StyledCollectBoard = styled.div`
  display: grid;
  max-width: 1100px;
  margin: 45px 0px 45px 0px;
  width: 100%;
  justify-self: center;
  grid-template-columns: 1fr;
  grid-template-areas:
    "general"
    "participants";
  grid-gap: 20px;
  align-content: baseline;

  .general {
    grid-area: general;
    background: #ffffff;
    padding: 2rem;
  }
  .participants {
    grid-area: participants;
  }
  .noresponses {
  }
  .searchArea {
    display: grid;
    justify-content: start;
    align-items: center;
    span {
      font-size: 18px;
      margin-bottom: 0.5rem;
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
        border-color: ${(props) => props.theme.red};
      }
    }
  }
`;

export const StyledParticipantsBoard = styled.div`
  display: grid;
  .tableHeader {
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1rem;
    p {
      font-weight: bold;
    }
  }
  .tableRow {
    display: grid;
    margin: 5px 0px;
    padding: 10px 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1rem;
    background: white;
    align-items: center;
  }

  .ui.toggle.checkbox input:checked ~ .box:before,
  .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #007c70 !important;
  }
`;

export const StyledParticipantPage = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin: 5px 5px;
  padding: 10px;
  align-content: baseline;
  .infoItem {
    display: grid;
    margin: 5px 0px;
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    background: white;
  }

  .resultItem {
    display: grid;
    margin: 5px 0px;
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
    background: white;
  }

  .ui.toggle.checkbox input:checked ~ .box:before,
  .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #007c70 !important;
  }
`;
