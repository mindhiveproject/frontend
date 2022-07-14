import styled from 'styled-components';

export const StyledSettings = styled.div`
  display: grid;
  align-content: baseline;
  grid-gap: 18px;
  background: #f4f5f5;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
  overflow-y: scroll;
  .menuTitle {
    h1 {
      color: lightgrey;
    }
  }
  .selectedMenuTitle {
    h1 {
      color: black;
    }
  }
  .studyDescription {
    display: grid;
    .selector {
      margin: 10px 0px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 150%;
      color: #1a1a1a;
    }
  }
  .addStudyBlock {
  }
`;

export const StyledCard = styled.div`
  display: grid;
  padding: 20px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  margin: 10px 0px;
  .accessLink {
    cursor: pointer;
    padding: 15px 10px 15px 10px;
    background: #ffffff;
    border: 1px solid #ced4da;
    box-shadow: 0px 2px 2px rgba(33, 37, 41, 0.06),
      0px 0px 1px rgba(33, 37, 41, 0.08);
    border-radius: 8px;
  }
  .highlight {
    background: #fff3cd;
  }
  input {
    padding: 10px 10px 10px 10px;
    background: #ffffff;
    border: 1px solid #ced4da;
    box-shadow: 0px 2px 2px rgba(33, 37, 41, 0.06),
      0px 0px 1px rgba(33, 37, 41, 0.08);
    border-radius: 8px;
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const StyledSettingsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 70px;
  grid-gap: 16px;
  justify-items: start;
  border-radius: 5px;
`;

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

export const StyledBuilder = styled.div`
  background: #e5e5e5;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  overflow: auto;
`;

// this is probably deprecated - has to be deleted later
export const StyledPreviewPane = styled.div`
  display: grid;
  margin: 30px 50px 30px 50px;
  overflow-y: scroll;

  input,
  textarea,
  select {
    background: #e5e5e5;
    width: 100%;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: #007c70;
    color: white;
    max-width: 256px;
  }

  .title {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 23px;
  }
  .description {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
  .timeInformationBlock {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 40px 0px 30px 0px;
    label {
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
      color: #666666;
    }
    input {
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #28619e;
    }
  }
  .completeTimeLine {
    display: grid;
    grid-template-columns: 24px auto;
  }
  .infoTabsContainer {
    display: grid;
    align-items: center;
    grid-template-columns: auto 100px;
    grid-gap: 10px;
    button {
      height: 50px;
      background: none;
      color: #007c70;
      border-color: #007c70;
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.05em;
      text-align: center;
    }
    .text {
      font-family: Lato !important;
      font-size: 16px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 24px !important;
      letter-spacing: 0em !important;
      text-align: left !important;
      color: #666666 !important;
    }
  }
  .tabHeaderContainer {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .procedureTabContainer {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .viewingBtnsContainer {
    display: grid;
    justify-items: end;
    align-items: center;
    grid-template-columns: 1fr auto;
    grid-gap: 9px;
    button {
      background: none;
      color: #007c70;
    }
  }
  .viewingBtns {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .discoverMenu {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    margin: 20px 6px 29px 6px !important;
    cursor: pointer;

    .discoverMenuTitle {
      padding-bottom: 10px !important;
      display: grid;
      justify-content: center;
      border-bottom: 2px solid #e6e6e6;
      p {
        font-size: 18px;
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
