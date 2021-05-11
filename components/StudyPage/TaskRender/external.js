import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  height: 100vh;
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: -1%;
  right: -1%;
  width: 3.3rem;
  line-height: 3rem;
  text-align: center;
  cursor: pointer;
  border-radius: 2.25rem;
  background-color: #4fbf1f;
  color: white;
  padding-bottom: 5px;
  font-size: 2rem;
  :hover {
    background-color: #ea0707;
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

class ExternalTask extends Component {
  render() {
    const { task, onEndTask } = this.props;
    return (
      <StyledBox>
        <CloseButton onClick={onEndTask}>&times;</CloseButton>
        <iframe
          src={task?.link}
          height="100%"
          width="100%"
          frameBorder="0"
        ></iframe>
      </StyledBox>
    );
  }
}

export default ExternalTask;
