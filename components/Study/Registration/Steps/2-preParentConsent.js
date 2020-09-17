import React, { Component } from 'react';
import { Logo } from '../../../Header/styles';

import { ResponseButtons, OnboardingHeader } from '../../styles';

class PreParentConsent extends Component {
  render() {
    return (
      <div>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>
          <div>Study consent</div>
          <a
            style={{ cursor: 'pointer', textAlign: 'end' }}
            onClick={this.props.onClose}
          >
            &times;
          </a>
        </OnboardingHeader>
        <h1>Parental consent required</h1>
        <h3>
          Because you are under the age of 18, we need to get consent from your
          parent to proceed. Please ask your parent to complete the next page.
        </h3>
        <button onClick={this.props.onNext}>Next</button>
      </div>
    );
  }
}

export default PreParentConsent;
