import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import ReactHtmlParser from 'react-html-parser';
import { Logo } from '../../../Header/styles';

import { OnboardingHeader, StyledConsentForm } from '../../styles';

class StudyConsentFormText extends Component {
  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { consent } = this.props;
    const publicStudies = consent?.studies.filter(study => study.public) || [];

    const regularAdultsConsent =
      consent?.info
        .filter(info => info.name === 'regularAdults')
        .map(info => info.text) || '';

    const regularAdultsSonaConsent =
      consent?.info
        .filter(info => info.name === 'sonaAdults')
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

        {(this.props.sonaParticipant === 'no' ||
          typeof this.props.sonaParticipant === 'undefined') && (
          <div>{ReactHtmlParser(regularAdultsConsent)}</div>
        )}

        {this.props.sonaParticipant === 'yes' && (
          <div>{ReactHtmlParser(regularAdultsSonaConsent)}</div>
        )}

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
