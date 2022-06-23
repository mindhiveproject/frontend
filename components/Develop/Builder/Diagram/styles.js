import styled from 'styled-components';

export const StyledDigram = styled.div`
  .App {
    font-family: sans-serif;
    text-align: center;
  }

  .my-node {
    width: 378px;
    height: 128px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }

  .my-port {
    width: 13px;
    height: 13px;
    border-radius: 10px;
    background-color: #556aeb;
    cursor: pointer;
    position: relative;
    z-index: -2;
    cursor: pointer;
  }

  .my-node-header-container {
    width: 100%;
    height: 58px;
    text-align: left;
    font-weight: bold;
    position: absolute;
    top: 0;
    display: flex;
    border-radius: 8px;
    border-bottom: 1px solid #efefef;
  }

  .my-node-header-text {
    color: #1a1a1a;
    font-size: 16px;
    /* padding-left: 3px; */
    margin: 15px 0px 0 10px;

    /* font-family: 'Inter'; */
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }

  .my-node-content {
    /* color: #6a6b6b; */
    /* font-size: 11px; */
    /* text-align: left; */
    /* width: 80%; */
    /* margin: 0 auto; */
    margin: 80px 0 0 10px;
    color: #666666;
    /* font-family: Inter; */
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

  .port-container {
    position: absolute;
    top: 40px;
  }

  .left-port {
    top: 0;
    margin-top: -9px;
    margin-left: 179px;
  }

  .right-port {
    /* right: 0;
    margin-right: -7px; */
    bottom: 0;
    margin-top: 81px;
    margin-left: 179px;
  }

  .my-icon {
    margin-top: 3px;
    margin-left: 4px;
  }
`;
