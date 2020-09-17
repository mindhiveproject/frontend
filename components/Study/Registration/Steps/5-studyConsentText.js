import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import ReactHtmlParser from 'react-html-parser';

import { OnboardingHeader, StyledConsentForm } from '../../styles';

class StudyConsentForm extends Component {
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
            <div>Study consent</div>
            <a
              style={{ cursor: 'pointer', textAlign: 'end' }}
              onClick={this.props.onClose}
            >
              &times;
            </a>
          </OnboardingHeader>
        )}

        <h1>Study consent</h1>

        <div>{ReactHtmlParser(regularAdultsConsent)}</div>

        <div className="buttonsHolder">
          <button onClick={this.props.onNext}>I agree, next</button>
          <button onClick={this.props.onSkip}>Skip consent</button>
        </div>
      </StyledConsentForm>
    );
  }
}

export default StudyConsentForm;
