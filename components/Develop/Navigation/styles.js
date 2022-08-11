import styled from 'styled-components';

export const SaveButton = styled.div`
  .navigationSaveButton {
    background: #556aeb;
    border: 1px solid #556aeb;

    border-radius: 100px;
    padding: 8px 20px;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;

    cursor: pointer;
    width: 82px;
  }
`;

export const StyledNavigation = styled.div`
  display: grid;
  .firstLine {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
    padding: 7px;
    background: #ffffff;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
    .leftPanel {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: auto 1fr;
      align-items: center;
      .goBackBtn {
        font-family: Lato;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        color: #007c70;
        cursor: pointer;
      }
      .studyTitle {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #1a1a1a;
      }
    }
    .rightPanel {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: auto auto auto auto;
      .chatButton,
      .archiveDeleteIcon {
        display: grid;
        align-items: center;
        justify-items: center;
        background: #f3f5f6;
        width: 42px;
        height: 42px;
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
  .secondLine {
    padding: 0px 15px;
    background: #e8ebef;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
    .discoverMenu {
      display: grid;
      grid-gap: 5px;
      grid-template-columns: repeat(auto-fill, 165px);
      margin: 10px 0px 0px 0px !important;
      cursor: pointer;

      .discoverMenuTitle {
        padding-bottom: 10px !important;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 11px;
        justify-self: center;
        padding: 0px 10px;
        justify-items: center;
        border-bottom: 2px solid #e8ebef;
        p {
          color: #1a1a1a;
          font-size: 14px;
          line-height: 23px;
        }
      }
      .selectedMenuTitle {
        border-bottom: 4px solid #556aeb !important;
        p {
          color: #1a1a1a;
          font-weight: 700;
          line-height: 23px;
        }
      }
    }
  }
`;
