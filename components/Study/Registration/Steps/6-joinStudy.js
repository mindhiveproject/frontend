import React, { Component } from 'react';
import styled from 'styled-components';
import { ResponseButtons, OnboardingHeader } from '../../styles';
import { Logo } from '../../../Header/styles';

const StyledStartButton = styled.div`
  button {
    padding: 20px;
    width: 150px;
  }
`;

class JoinStudy extends Component {
  render() {
    return (
      <StyledStartButton>
        <button onClick={this.props.onNext}>Join the study</button>
      </StyledStartButton>
    );
  }
}

export default JoinStudy;
