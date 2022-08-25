import styled from 'styled-components';

export const StyledDevelopWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  overflow: overlay;
`;

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0px;
  height: 100%;
  .modal {
    display: grid;
    align-content: baseline;
    padding: 20px;
    position: relative;
    background: white;
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    min-width: 800px;
    max-width: 1000px;
    bottom: 0;
    transition: all 0.3s;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    z-index: 5;
    overflow-y: auto;
  }
`;

export const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 60% auto;
  column-gap: 1px;
  .leftPanel {
    padding 50px 70px 0px 70px;
    background-color: #F7F9F8;
  }
  .rightPanel {
    padding: 50px;
    background-color: #F7F9F8;
  }
  .contentBlock {
    margin-bottom: 30px;
    ul {
      padding-left: 20px;
    }
  }
  .symbolBlock {
    background: #FFFFFF;
    box-shadow: 0px 2px 10px
      rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 50px;
  }
  p, li, span {
    font-size: 16px;
  }
  img {
    width: 100%;
  }
`;

export const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 70% auto;
  grid-gap: 20px;
  padding: 50px;
  .rightPanel {
    padding-top: 50px;
  }
`;

export const StyledButtons = styled.div`
  width: 100%;
  display: grid;
  justify-items: end;
  button {
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    padding: 14px 24px;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;
    text-align: center;
  }
  .closeBtn {
    background: #ffffff;
    color: #666666;
    border: 2px solid #b3b3b3;
  }
  .addBtn {
    background: #556aeb;
    color: white;
    border-radius: 100px;
    border: 0px;
    margin-bottom: 15px;
  }
  .previewBtn {
    background: #e9ecef;
    color: black;
    border-radius: 100px;
    border: 0px;
  }
`;
