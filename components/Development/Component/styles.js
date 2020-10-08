import styled, { keyframes } from 'styled-components';

export const StyledParameterBlock = styled.div`
  /* font-size: 1.5rem; */
  display: grid;
  /* grid-gap: 10px; */
  /* grid-template-columns: 1fr; */
  /* margin-top: 10px;
  margin-bottom: 10px; */
  /* border: 1px solid #eceaea; */
  /* border-radius: 5px; */
  /* padding: 10px; */
  margin-top: 10px;
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
  /* textarea {
    height: 100px;
  } */
  button {
    background: white;
    color: #aa4747;
    width: fit-content;
    border: 1px solid grey;
  }
`;

export const StyledTaskPreviewPane = styled.div`
  display: grid;
  align-content: baseline;
  /* padding: 30px; */
  /* border: 1px solid grey; */
  /* background: #ffffff; */

  .discoverMenu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 24px !important;

    .discoverMenuTitle {
      padding-bottom: 10px !important;
      display: grid;
      justify-content: center;
      border-bottom: 2px solid #e6e6e6;
      p {
        font-family: Lato;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        color: #666666;
      }
    }
    .selectedMenuTitle {
      border-bottom: 4px solid #ffc107 !important;
      p {
        color: #1a1a1a;
      }
    }
  }
`;

// export const StudyBuilderNav = styled.div`
//   display: grid;
//   grid-template-columns: auto auto auto;
//   justify-content: space-between;
//   margin: 1rem;
// `;
//
// export const StyledPreviewPane = styled.div`
//   background: #e5e5e5;
//   display: grid;
//   border: 1px solid grey;
//   padding: 30px;
// `;

// export const StyledStudyBuilderPage = styled.div`
//   display: grid;
//   margin: 1rem;
// `;

// export const StyledStudyBuilder = styled.div`
//   display: grid;
//   width: 100%;
//   grid-template-columns: 4fr 6fr;
//   grid-gap: 20px;
//   margin: 10px;
//
//   h1 {
//     font-family: Lato;
//     font-size: 48px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 56px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #1a1a1a;
//   }
//
//   h2 {
//     font-family: Roboto;
//     font-size: 24px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 23px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #1a1a1a;
//   }
//
//   a {
//     cursor: pointer;
//     font-family: Lato;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 22px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #007c70;
//   }
//
//   .backButton {
//     margin-bottom: 21px;
//     padding-left: 10px;
//   }
// `;

// export const StyledEditPane = styled.div`
//   display: grid;
//   align-content: baseline;
//   padding: 30px;
//   border: 1px solid grey;
//   background: #ffffff;
//
//   .discoverMenu {
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     margin-bottom: 24px !important;
//
//     .discoverMenuTitle {
//       padding-bottom: 10px !important;
//       display: grid;
//       justify-content: center;
//       border-bottom: 2px solid #e6e6e6;
//       p {
//         font-family: Lato;
//         font-size: 18px;
//         font-style: normal;
//         font-weight: 400;
//         line-height: 23px;
//         letter-spacing: 0em;
//         color: #666666;
//       }
//     }
//     .selectedMenuTitle {
//       border-bottom: 4px solid #ffc107 !important;
//       p {
//         color: #1a1a1a;
//       }
//     }
//   }
// `;

export const Center = styled.div`
  text-align: center;
`;

export const TasksList = styled.div`
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

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

export const StyledTaskForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  // background: rgba(0, 0, 0, 0.01);
  border: 5px solid white;
  border-radius: 10px;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    /* margin-bottom: 1rem; */
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 5px;
    &:focus {
      outline: 0;
      background: mintcream;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: #24b781;
    color: white;
    border: 0;
    border-radius: 5px;
    font-size: 2rem;
    font-weight: 600;
    padding: 1rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #208962 0%,
        #49e889 50%,
        #208962 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export const StyledTaskBlock = styled.div`
  /* background: #fbfbfb; */
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  /* grid-row-gap: 20px; */
  /* margin-top: 25px; */
  margin-bottom: 15px;
  /* border: 1px solid #eceaea; */
  border-radius: 5px;
  /* padding: 20px; */
  .help {
    font-size: 2rem;
    font-weight: 500;
  }
  .example {
    /* color: #554e4e;
    font-weight: 400; */
  }
  .name {
    color: lightslategrey;
    font-weight: 400;
    justify-self: end;
  }
  .input {
    /* grid-column: 1/3; */
  }
  textarea {
    height: 300px;
  }
  .addButton {
    cursor: pointer;
    width: 5.5rem;
    text-align: center;
    border-radius: 6rem;
    background-color: #4fbf1f;
    color: white;
    font-size: 3rem;
    :hover {
      background-color: #3cb906;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
  .activePageButton {
    border-radius: 10rem;
  }
  .notActivePageButton {
    border-radius: 10rem;
    background-color: white;
    color: darkgreen;
  }
`;

export const ControlButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-gap: 20px;
  padding-top: 10px;
  button {
    cursor: pointer;
  }
`;

export const StyledStatementLine = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  button {
    cursor: pointer;
    width: 4.3rem;
    text-align: center;
    border-radius: 2.25rem;
    background-color: #4fbf1f;
    color: white;
    font-size: 2rem;
    :hover {
      background-color: #ea0707;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

export const StyledOptionLine = styled.div`
  width: auto;
  background: white;
  color: grey;
  border: 0;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 1.2rem;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid lightslategrey;
  &.selected {
    background: #24b781;
    color: white;
  }
`;

export const StyledItemLine = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  button {
    cursor: pointer;
    width: 4.3rem;
    text-align: center;
    border-radius: 2.25rem;
    background-color: #4fbf1f;
    color: white;
    font-size: 2rem;
    :hover {
      background-color: #ea0707;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

export const StyledSurveyBuilderItemLine = styled.div`
  border-bottom: 3px #e7d6d6 solid;
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 9fr 1fr;
  grid-column-gap: 10px;
  .controlButtons {
    display: grid;
  }
  .deleteDiv {
    display: grid;
    align-self: start;
    justify-self: end;
  }
  .moveButtons {
    display: grid;
    align-self: end;
    justify-self: end;
    button {
      background-color: orange;
      :hover {
        background-color: #d9b616;
        transform: scale(1.1);
        transition: transform 0.5s;
      }
    }
  }
  button {
    cursor: pointer;
    width: 4.3rem;
    text-align: center;
    border-radius: 2.25rem;
    background-color: #ff2d2d;
    color: white;
    font-size: 2rem;
    :hover {
      background-color: #ea0707;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
  textarea {
    height: 120px;
  }
  .optionRow {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-column-gap: 10px;
  }
  .addOptionButton {
    cursor: pointer;
    width: 10rem;
    text-align: center;
    border-radius: 3rem;
    background-color: #a78803;
    color: white;
    font-size: 1.5rem;
    :hover {
      background-color: #e5bc0c;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

export const StyledPageButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin: 20px 0px 20px 0px;
`;

export const StyledPageHeader = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
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

export const StyledTask = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 5%;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
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

export const StyledTasks = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 5%;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
  grid-row-gap: 10px;
`;

export const StyledTaskLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-column-gap: 10px;
  border: 1px solid #d6e3d6;
  padding: 5px 10px 5px 10px;
  align-items: center;
  border-radius: 5px;
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
`;
