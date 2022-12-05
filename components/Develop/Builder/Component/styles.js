import styled from 'styled-components';

export const StyledEditor = styled.div`
  display: grid;
  font-family: Inter;
  background: #f4f5f5;

  align-content: baseline;
  overflow: auto;

  p {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
  }

  h1 {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1a1a1a;
  }

  h2 {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #1a1a1a;
  }

  label {
    display: block;
  }
  input {
    margin-top: 10px;
  }
  input,
  select {
    width: 100%;
    height: 46px;
    font-family: Lato;
    font-size: 16px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0px 0px 0px 10px;
  }
  input[type='checkbox'] {
    width: 24px;
    height: 24px;
  }
  textarea {
    width: 100%;
    font-family: Lato;
    font-size: 16px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    &:focus {
      outline: 0;
      background: mintcream;
      border-color: ${props => props.theme.red};
    }
  }
`;

export const StyledNavigation = styled.div`
  display: grid;

  justify-content: stretch;
  align-items: center;
  margin: 20px 22.5px 10px 42px;

  .firstLine {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
  }

  .navButtons {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto auto;
    grid-gap: 1rem;
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  button {
    border-radius: 100px;
    padding: 8px 20px;
    border: 0px solid #cccccc;
    cursor: pointer;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .primaryBtn {
    background: #007c70;
    color: #ffffff;
  }
  .secondaryBtn {
    background: #e9ecef;
    color: #212529;
  }
`;

export const StyledEditPane = styled.div`
  display: grid;
  grid-gap: 18px;
  margin-top: 10px;
  padding: 10px 48px 0px 42px;
  .block {
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    padding: 20px 25px 20px 30px;
  }
  .timeout {
    display: grid;
    grid-template-columns: 1fr;
    margin: 10px 0px;
    border-bottom: 3px #e7d6d6 solid;
  }
`;

export const StyledParameters = styled.div`
  display: grid;
  grid-gap: 18px;
`;

export const StyledTaskBlock = styled.div`
  display: grid;

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

// resize: horizontal;
// overflow: auto;

// export const StyledEditorPage = styled.div`
//   display: grid;
//   height: 100vh;
//   grid-template-rows: auto 1fr;
//   overflow-y: auto;
//
//   span {
//     font-family: Lato;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 16px;
//     letter-spacing: 0em;
//   }
//   label {
//     font-family: Lato;
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 24px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #666666;
//     margin-bottom: 0;
//   }
//   button {
//     display: grid;
//     align-content: center;
//     max-width: 300px;
//     width: 100%;
//     background: none;
//     color: #666666;
//     padding: 15px 10px;
//     border: 1px solid #cccccc;
//     border-radius: 4px;
//     cursor: pointer;
//     font-family: Roboto;
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 16px;
//     letter-spacing: 0.05em;
//     text-align: center;
//   }
//   .lightBtn {
//     background: none;
//     color: #007c70;
//     border: 2px solid #007c70;
//     font-family: Lato;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 18px;
//     letter-spacing: 0.05em;
//     text-align: center;
//   }
// `;

// export const StyledBuilder = styled.div`
//   background: #e5e5e5;
//   display: grid;
//   width: 100%;
//   grid-template-columns: ${props => (props.isWide ? '1fr 1fr' : '4fr 7fr')};
//
//   grid-gap: 20px;
//   .leftCompartment {
//     background: #ffffff;
//     height: 100%;
//     max-height: 90vh;
//     padding-bottom: 5rem;
//     resize: horizontal;
//     overflow: hidden;
//
//     :hover {
//       overflow: auto;
//     }
//   }
//   .rightCompartment {
//     height: 100%;
//     max-height: 90vh;
//     padding-bottom: 5rem;
//     overflow: auto;
//     mask-image: linear-gradient(to top, transparent, black),
//       linear-gradient(to left, transparent 15px, black 15px);
//     mask-size: 100% 20000px;
//     mask-position: left bottom;
//     -webkit-mask-image: linear-gradient(to top, transparent, black),
//       linear-gradient(to left, transparent 15px, black 15px);
//     -webkit-mask-size: 100% 20000px;
//     -webkit-mask-position: left bottom;
//     transition: mask-position 0.3s, -webkit-mask-position 0.3s;
//
//     :hover {
//       -webkit-mask-position: left top;
//     }
//   }
// `;

// export const StyledPreviewPane = styled.div`
//   display: grid;
//   /* margin: 40px 70px 40px 70px; */
//   margin: 1rem;
//   /* resize: horizontal; */
//   overflow: auto;
//
//   input,
//   textarea,
//   select {
//     background: #e5e5e5;
//     font-family: Lato;
//     width: 100%;
//     border: 1px solid #e6e6e6;
//     border-radius: 4px;
//     font-size: 16px;
//     &:focus {
//       outline: 0;
//       background: white;
//       border-color: mintcream;
//     }
//   }
//   button {
//     background: #007c70;
//     color: white;
//     max-width: 256px;
//   }
//
//   .title {
//     font-family: Lato;
//     font-size: 48px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 56px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #1a1a1a;
//     margin-bottom: 23px;
//   }
//   .description {
//     font-family: Lato;
//     font-size: 24px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 32px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #666666;
//   }
//   .timeInformationBlock {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     margin: 40px 0px 30px 0px;
//     label {
//       font-family: Lato;
//       font-size: 14px;
//       font-style: normal;
//       font-weight: 400;
//       line-height: 28px;
//       letter-spacing: 0em;
//       text-align: left;
//       color: #666666;
//     }
//     input {
//       font-family: Roboto;
//       font-size: 18px;
//       font-style: normal;
//       font-weight: 700;
//       line-height: 20px;
//       letter-spacing: 0em;
//       text-align: left;
//       color: #28619e;
//     }
//   }
//   .completeTimeLine {
//     display: grid;
//     grid-template-columns: 24px auto;
//   }
//   .infoTabsContainer {
//     display: grid;
//     align-items: center;
//     grid-template-columns: auto 100px;
//     grid-gap: 10px;
//     button {
//       height: 50px;
//       background: none;
//       color: #007c70;
//       border-color: #007c70;
//       font-family: Lato;
//       font-size: 18px;
//       font-style: normal;
//       font-weight: 400;
//       line-height: 18px;
//       letter-spacing: 0.05em;
//       text-align: center;
//     }
//     .text {
//       font-family: Lato !important;
//       font-size: 16px !important;
//       font-style: normal !important;
//       font-weight: 400 !important;
//       line-height: 24px !important;
//       letter-spacing: 0em !important;
//       text-align: left !important;
//       color: #666666 !important;
//     }
//   }
//   .tabHeaderContainer {
//     display: grid;
//     grid-template-columns: auto 1fr;
//   }
//   .procedureTabContainer {
//     display: grid;
//     grid-template-columns: auto auto;
//     margin-top: 40px;
//     margin-bottom: 40px;
//   }
//   .viewingBtnsContainer {
//     display: grid;
//     justify-items: end;
//     align-items: center;
//     grid-template-columns: 1fr auto;
//     grid-gap: 9px;
//   }
//   .viewingBtns {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     height: 46px;
//     button {
//       border: 1px solid #cccccc;
//       box-sizing: border-box;
//       border-radius: 0px 4px 4px 0px;
//     }
//   }
//   .selectedBtn {
//     background: #fff3cd;
//     color: #666666;
//   }
//   .nonSelectedBtn {
//     background: none;
//     color: #666666;
//     background: #ffffff;
//   }
//   .discoverMenu {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
//     margin: 20px 6px 29px 6px !important;
//     cursor: pointer;
//
//     .discoverMenuTitle {
//       padding-bottom: 10px !important;
//       display: grid;
//       justify-content: center;
//       border-bottom: 2px solid #e6e6e6;
//       p {
//         font-size: 18px;
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

// export const StudyBuilderNav = styled.div`
//   display: grid;
//   grid-template-columns: auto auto 1fr auto auto;
//   grid-gap: 3rem;
//   justify-content: stretch;
//   align-items: center;
//   margin: 20px 22.5px 10px 42px;
//
//   p {
//     margin: 0;
//   }
//   .goBackBtn {
//     font-family: Lato;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 22px;
//     letter-spacing: 0em;
//     text-align: left;
//     color: #007c70;
//     cursor: pointer;
//   }
//   .taskLabel {
//     border: 1px solid #e5e5e5;
//     box-sizing: border-box;
//     border-radius: 4px;
//     padding: 5px 10px;
//     background: #e5e5e5;
//     font-family: Lato;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 18px;
//     letter-spacing: 0.05em;
//     text-align: center;
//     p {
//       color: #00000099;
//     }
//   }
//   .taskTitle {
//     p {
//       font-family: Lato;
//       font-size: 16px;
//       font-style: normal;
//       font-weight: 400;
//       line-height: 19px;
//       letter-spacing: 0em;
//       text-align: left;
//       color: #1a1a1a;
//     }
//   }
//   .saveBtn {
//     display: grid;
//     grid-template-columns: auto auto;
//     grid-gap: 10px;
//     justify-self: end;
//     margin: 0px 0px 0px 0px;
//   }
//   .secondaryBtn {
//     background: #007c70;
//     color: #ffffff;
//   }
//   button {
//     border: 2px solid #007c70;
//     box-sizing: border-box;
//     border-radius: 4px;
//     padding: 14px 24px;
//     height: 46px;
//     color: #007c70;
//     font-family: Lato;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 18px;
//     letter-spacing: 0.05em;
//     text-align: center;
//   }
//   .discoverMenu {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//     grid-column-gap: 5px;
//     justify-content: space-around;
//     cursor: pointer;
//
//     .discoverMenuTitle {
//       padding-bottom: 10px !important;
//       display: grid;
//       justify-content: center;
//       border-bottom: 2px solid transparent;
//       p {
//         font-size: 18px;
//       }
//     }
//     .selectedMenuTitle {
//       border-bottom: 4px solid #ffc107 !important;
//       p {
//         color: #1a1a1a;
//       }
//     }
//   }
//   .addCollaboratorsButton {
//     border: 2px solid #b3b3b3;
//   }
//   .rightButtons {
//     display: grid;
//     grid-template-columns: auto auto auto;
//     grid-gap: 1rem;
//     @media only screen and (max-width: 1000px) {
//       grid-template-columns: 1fr;
//     }
//   }
// `;

export const UploadImageContainer = styled.div`
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    background: #f2f2f2;
    padding: 65px 52px 65px 52px;
    margin-bottom: 10px;
  }

  .upload-btn-wrapper-with-image {
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-bottom: 10px;
  }

  .btn {
    color: white;
    background-color: white;
    padding: 14px 18px;
    border-radius: 4px;
    font-size: 18px;
    background: #b3b3b3;
    border: 2px solid #b3b3b3;
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;
    text-align: center;
  }

  .upload-btn-wrapper input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .upload-btn-wrapper-with-image input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

export const StyledSelectionScreen = styled.div`
  display: grid;
  grid-template-rows: minmax(1px, auto) 1fr;
  height: 100%;
  background: #f7f9f8;

  .selectionHeader {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .goBackBtn {
    cursor: pointer;
    margin: 1rem;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
  }

  .closeBtn {
    width: 6rem;
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 4rem;
    :hover {
      transform: scale(1);
      color: red;
      transition: transform 2s;
    }
  }

  .selectionBody {
    display: grid;
    align-content: center;
    text-align: center;
    justify-self: center;
    width: 90%;
    max-width: 1400px;
  }

  .studyOptions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 50px;
    justify-items: center;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 50px;
    justify-items: center;
  }

  h1 {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 40px;
  }
  h3 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-align: center;
  }
  p {
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
  }

  .option {
    max-width: 355px;
  }
  .iconSelect {
    height: 90px;
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .option {
    cursor: pointer;
    padding: 60px 29px 60px 29px;
    :hover {
      background: #ffffff;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09),
        0px 5px 6px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      transform: scale(1.05);
      transition: transform 0.5s;
    }
  }
  .selectHeader {
    p {
      text-align: center;
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

export const StyledPageButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin: 20px 0px 20px 0px;
  .activePageButton {
    background-color: #007c70;
    border-color: #007c70;
    color: white;
  }
  .notActivePageButton {
  }
`;

export const StyledPageHeader = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

export const StyledParameterBlock = styled.div`
  display: grid;
  grid-gap: 0.5rem;

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
    font-size: 1.5rem;
    color: lightslategrey;
    font-weight: 900;
    justify-self: start;
    margin: 2rem 0rem 1rem 0rem;
  }
  .input {
    label {
      margin-bottom: 4px;
    }
    input {
      margin-top: 0;
    }
  }
  textarea {
    height: 120px;
  }
  button {
    background: white;
    color: #aa4747;
    width: fit-content;
    border: 1px solid grey;
  }
  .iconSelector {
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    align-items: center;
    justify-items: center;
  }
`;
