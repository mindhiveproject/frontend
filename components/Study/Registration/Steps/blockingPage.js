import React, { Component } from 'react';

import { Logo } from '../../../Header/styles';

import { OnboardingHeader } from '../../styles';

class BlockingPage extends Component {
  render() {
    return (
      <div>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>
          <div>{this.props.header}</div>
          <a
            style={{ cursor: 'pointer', textAlign: 'end' }}
            onClick={this.props.onClose}
          >
            &times;
          </a>
        </OnboardingHeader>

        <h3>{this.props.message}</h3>
      </div>
    );
  }
}

export default BlockingPage;
