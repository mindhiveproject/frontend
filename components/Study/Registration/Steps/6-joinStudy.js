import React, { Component } from 'react';
import { ResponseButtons, OnboardingHeader } from '../../styles';
import { Logo } from '../../../Header/styles';

class JoinStudy extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onNext}>Start</button>
      </div>
    );
  }
}

export default JoinStudy;
