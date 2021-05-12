import styled from 'styled-components';

export const StyledCollectSection = styled.div`
  background: #e5e5e5;
  display: grid;
  justify-content: stretch;
  width: 100%;
  /* height: 90vh; */

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
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
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
    'general'
    'participants';
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
`;

export const StyledParticipantsBoard = styled.div`
  display: grid;
  .tableHeader {
    display: grid;
    /* margin: 5px; */
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    cursor: pointer;
    font-weight: bold;
  }
  .tableRow {
    display: grid;
    margin: 5px 0px;
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    background: white;
    cursor: pointer;
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
    /* cursor: pointer; */
  }

  .resultItem {
    display: grid;
    margin: 5px 0px;
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
    background: white;
  }
`;
