import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
`;

export const StyledDigram = styled.div`
  .App {
    font-family: sans-serif;
    text-align: center;
  }

  svg {
    overflow: visible;
  }

  .node {
    display: grid;
    width: 378px;
    height: 128px;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }

  .node-header-container {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 0px 20px 0px 20px;
    align-items: center;
    height: 58px;
    border-radius: 8px;
    border-bottom: 1px solid #efefef;
  }

  .node-header-text {
    color: #1a1a1a;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }

  .node-header-icons {
  }

  .my-port {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background-color: #556aeb;
    cursor: pointer;
    position: relative;
    z-index: -2;
    cursor: pointer;
  }

  .node-content {
    display: grid;
    padding: 0px 20px 0px 20px;
    color: #666666;
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

  .up-port {
    top: 0;
    margin-top: -12px;
    margin-left: 179px;
    :hover {
      background-color: lightblue;
      border-radius: 10px;
    }
  }

  .bottom-port {
    margin-right: -7px;
    bottom: 0;
    margin-top: 87px;
    margin-left: 179px;
  }
`;
