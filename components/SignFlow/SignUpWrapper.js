import React, { Component } from 'react';
import Head from 'next/head';
import GetStarted from './Flow/1-getStarted';
import StudyConsent from './Flow/2-studyConsent';
import HowToJoin from './Flow/3-howToJoin';
import Sign from './Flow/4-sign';
import Sorry from './Flow/blockingPage';

import { OnboardingModal, OnboardingForm } from './styles';

class SignUpWrapper extends Component {
  render() {
    const { study, query } = this.props;
    const { step } = query;

    return (
      <OnboardingModal id="OnboardingModal">
        <OnboardingForm>
          <Head>
            <title>mindHIVE | {study.title}</title>
          </Head>
          {step === 'getstarted' && <GetStarted {...this.props} />}
          {step === 'studyconsent' && <StudyConsent {...this.props} />}
          {step === 'howtojoin' && <HowToJoin {...this.props} />}
          {step === 'sign' && <Sign {...this.props} />}
          {step === 'sorry' && <Sorry {...this.props} />}
        </OnboardingForm>
      </OnboardingModal>
    );
  }
}

export default SignUpWrapper;
