import styled from 'styled-components';

export const StyledStudyPage = styled.div`
  display: grid;
  grid-template-columns: 8fr 3fr;
  max-width: 1500px;
  margin: 2rem auto;
  padding: 3rem;
  /* box-shadow: ${props => props.theme.bs}; */
  min-height: 800px;

  button {
    height: 56px;
    width: 266px;
    background: ${props => props.theme.darkgreen};
    border: 2px solid ${props => props.theme.darkgreen};
    box-sizing: border-box;
    border-radius: 4px;
    color: ${props => props.theme.white};
    font-family: 'Lato';
    font-size: 18px;
    letter-spacing: 0.05em;
    cursor: pointer;
  }
  a {
    text-decoration-line: underline;
  }
  img {
    width: 100%;
    height: 150px;
    object-fit: contain;
  }
  .studyDescription {
    margin-top: 20px;
  }
  .descriptionMenu {
    margin-bottom: 20px;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  .studyInformationBoard {

  }
  .timeFrequency {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .studyInformationHeader {
    font-size: 14px;
    line-height: 28px;
  }
`;

export const Center = styled.div`
  text-align: center;
`;

export const StudiesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export const StyledLink = styled.span`
  border-bottom: 5px solid orange;
  cursor: pointer;
`;

export const StyledParameterBlock = styled.div`
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #eceaea;
  border-radius: 5px;
  padding: 10px;
  .help {
    font-weight: 500;
  }
  .example {
    font-weight: 500;
  }
  .value {
    font-weight: 500;
  }
  .name {
    color: lightslategrey;
    font-weight: 500;
    justify-self: end;
  }
  .input {
  }
  textarea {
    height: 100px;
  }
  button {
    background: white;
    color: #aa4747;
    width: fit-content;
    border: 1px solid grey;
  }
`;

export const StyledStudyCard = styled.div`
  padding: 20px;
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: grid;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 400;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export const StyledCardButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: center;
  border: 1px solid #eef4fb;
  align-self: end;
`;

export const StyledStudy = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: ${props => props.theme.bs};
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export const StyledBuildStudy = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export const StyledTaskCard = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: grid;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 400;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: left;
  align-self: end;
  button {
    font-weight: 300;
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button: hover {
    background: rgb(246, 110, 94);
    a {
      color: white;
    }
  }
  button:disabled,
  button[disabled] {
    background-color: black;
    a {
      color: white;
    }
  }
`;
