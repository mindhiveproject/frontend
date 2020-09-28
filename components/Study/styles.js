import styled from 'styled-components';

export const StyledStudyPage = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  grid-template-areas:
    'description image'
    'tasks image'
    'tasks time'
    'tasks tags'
    'info tags'
    'info tags';
  grid-gap: 15px;
  max-width: 1500px;
  /* margin: 2rem auto; */
  min-height: 800px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'image'
      'description'
      'tasks'
      'time'
      'info'
      'tags';
  }
  @media (max-width: 375px) {
    padding: 1rem;
  }

  p {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #666666;
  }
  h1 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 56px;
    color: #1a1a1a;
  }
  h3 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #666666;
  }
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
    margin-top: 20px;
    margin-bottom: 20px;
  }
  a {
    text-decoration-line: underline;
    cursor: pointer;
  }
  img {
    max-width: 100%;
    /* max-height: 160px; */
    object-fit: cover;
  }

  .studyImage {
    /* display: grid; */
    /* justify-content: center; */
  }

  .studyImage,
  .studyTitleDescriptionBtns,
  .studyInfoTimePartners,
  .studyWhatWhoHow,
  .studyTagsContacts {
    padding: 10px;
  }

  .studyImage {
    grid-area: image;
  }
  .studyTitleDescriptionBtns {
    grid-area: description;
  }
  .studyInfoTimePartners {
    grid-area: time;
  }
  .studyWhatWhoHow {
    grid-area: info;
  }
  .studyTagsContacts {
    grid-area: tags;
  }

  .descriptionMenu {
    margin-bottom: 20px;
    .item {
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 23px;
      color: #1a1a1a;
    }
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  .timeFrequency {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .studyInformationHeader {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 28px;
    margin-bottom: 7px;
  }
  .studyTags {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, auto));
    grid-column-gap: 8px;
  }
  .studyTag {
    background: #ffffff;
    border: 2px solid #28619e;
    border-radius: 100px;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    color: #28619e;
    padding: 8px;
    text-align: center;
  }
  .partnersInfo {
    display: grid;
    grid-template-columns: 3fr 1fr 2fr 2fr;
    grid-column-gap: 10px;
    align-items: center;
  }

  .controlBtns {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    button {
      width: auto;
      margin: 0;
    }
    .secondaryBtn {
      border: 2px solid #007c70;
      color: #007c70;
      background: #f7f9f8;
    }
  }
`;

export const OnboardingHeader = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 12fr 1fr;
  align-items: end;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 2px solid #f2f2f2;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #28619e;
  .logo {
    display: grid;
  }
`;

export const OnboardingModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: white;
`;

export const OnboardingForm = styled.div`
  display: grid;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
  h1 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 56px;
  }
  h3 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
  }
  p {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
  }
  input {
    max-width: 500px;
    font-family: Lato;
    margin-bottom: 1rem;
    height: 48px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    /* width: 100%; */
    font-size: 16px;
    line-height: 24px;
    padding: 12px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button {
    max-width: 500px;
    font-family: Lato;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 100%;
    background: #007c70;
    color: white;
    padding: 1.5rem 0.5rem;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 100%;
    border: 2px solid #007c70;
    border-radius: 4px;
    cursor: pointer;
  }
  .checkboxField {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    display: grid;
    grid-template-columns: 1fr 14fr;
    align-items: center;
    input {
      margin-bottom: 0rem;
      width: 40%;
      color: #666666;
    }
  }
  .buttonsHolder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
  .emailInput {
    width: 300px;
  }
`;

export const ResponseButtons = styled.div`
  .selectedBtn {
    background: #007c70;
    color: #ffffff;
  }
  button {
    max-width: 322px;
    font-family: Lato;
    margin-top: 0.5rem;
    margin-bottom: 3rem;
    width: 100%;
    background: none;
    color: #666666;
    padding: 1.5rem 0.5rem;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 100%;
    border: 2px solid #007c70;
    border-radius: 4px;
    cursor: pointer;
    width: 90px;
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
  font-size: 18px;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 20px;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  align-content: baseline;
  grid-row-gap: 50px;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  button {
    /* margin-bottom: 5px; */
    /* margin: 6px; */
    /* min-height: 30px; */
    /* font-size: 18px; */
    /* line-height: 100%; */
    letter-spacing: 0.05em;
    color: #007c70;
    border: 2px solid #007c70;
    cursor: pointer;
    border-radius: 4px;
    padding: 1rem 3rem;
    background: none;
  }
  .removeBtn {
    border-radius: 10rem;
    background-color: white;
    color: darkgreen;
    padding: 1rem 1.5rem;
    color: red;
    border-color: red;
    :hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
  .saveBtn {
    background-color: red;
    color: white;
    border-color: red;
  }
  .selectedBtn {
    background-color: #007c70;
    color: white;
  }
  nonSelectedBtn {
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  .buildHeader {
    display: grid;
    justify-self: center;
    justify-items: center;
    align-self: baseline;
  }
  .buildBoard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-self: baseline;
    grid-column-gap: 50px;
  }
  .buildTaskItem {
    margin: 10px 0px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 10px;
    align-items: center;
  }
  .buildStudyItem {
    margin: 10px 0px;
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
  }
  .moveButtons {
    display: grid;
    align-self: end;
    justify-self: end;
    button {
      background-color: orange;
      :hover {
        background-color: white;
        transform: scale(1.1);
        transition: transform 0.5s;
      }
    }
  }
`;

export const StyledTaskCard = styled.div`
  padding: 20px;
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: grid;
  button {
    background: white;
    width: 100px;
  }
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

export const StyledSettingsBlock = styled.div`
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: 50px 1fr;
  justify-items: start;
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

export const StyledConsentForm = styled.div`
  display: grid;
  .coveredStudiesAndTasks {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .buttonsHolder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
  .headerTitle {
    display: grid;
    align-self: center;
  }
`;
