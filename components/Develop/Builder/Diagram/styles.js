import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
`;

export const StyledNode = styled.div`
  display: grid;
  width: 378px;
  height: 128px;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 8px;

  border-top: 8px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK'
      ? '#64c9e2'
      : props.taskType === 'SURVEY'
      ? '#28619e'
      : props.taskType === 'BLOCK'
      ? '#ffc7c3'
      : '#007c70'};

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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
    align-items: center;
    .icon {
      cursor: pointer;
    }
  }

  .port-container {
    position: absolute;
    top: 40px;
  }

  .up-port {
    top: 0;
    margin-top: -20px;
    margin-left: 0px;
  }

  .up-port:hover {
    border: 1px solid lightblue;
    border-radius: 10px;
  }

  .bottom-port {
    margin-right: -7px;
    bottom: 0;
    margin-top: 87px;
    margin-left: 170px;
  }

  .my-out-port {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: #007c70;
    cursor: pointer;
    position: relative;
    z-index: -2;
    cursor: pointer;
    text-align: center;
  }

  .my-in-port {
    width: 380px;
    height: 20px;
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
    position: relative;
    /* z-index: -2; */
    cursor: pointer;
    text-align: center;
    color: grey;
    opacity: 0.8;
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
`;

export const StyledDigram = styled.div`
  .App {
    font-family: sans-serif;
    text-align: center;
  }

  svg {
    overflow: visible;
  }

  

  .comment {
    display: grid;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }

  .comment-header-container {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 10px 20px 10px 20px;
    align-items: center;
    height: 100%
    border-bottom: 1px solid #efefef;
    background-color: #ffc107 !important;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .comment-header-text {
    color: #1a1a1a;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }

  .comment-content {
    display: grid;
    color: #666666;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    height: 100%;

    textarea {
      padding: 10px 20px 10px 20px;
      min-height: 100px;
      font-size: 18px;
      resize: none;
      border: solid 1px #ffc107;
      outline: none;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;
