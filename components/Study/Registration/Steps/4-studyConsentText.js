import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import ReactHtmlParser from 'react-html-parser';
import { Logo } from '../../../Header/styles';

import { OnboardingHeader, StyledConsentForm } from '../../styles';

class StudyConsentFormText extends Component {
  componentDidMount() {
    document.querySelector('#OnboardingModal').scrollTo(0, 0);
  }

  render() {
    const { consent } = this.props;
    const regularAdultsConsent =
      consent?.info
        .filter(info => info.name === 'regularAdults')
        .map(info => info.text) || '';

    return (
      <StyledConsentForm>
        {this.props.showCloseButton && (
          <OnboardingHeader>
            <Logo>
              <div className="logo">
                <img src="/static/MindHive_logo.png" alt="icon" height="30" />
              </div>
            </Logo>
            <div>Study consent</div>
            <a className="closeBtn" onClick={this.props.onClose}>
              &times;
            </a>
          </OnboardingHeader>
        )}

        <h1>Study consent</h1>

        <div>{ReactHtmlParser(regularAdultsConsent)}</div>

        <div className="buttonsHolder">
          <button onClick={this.props.onNext}>I agree, next</button>
        </div>
        <a onClick={this.props.onSkip}>
          <p>Skip consent</p>
        </a>
      </StyledConsentForm>
    );
  }
}

export default StudyConsentFormText;
