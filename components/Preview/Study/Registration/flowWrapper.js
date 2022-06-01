import React, { Component } from 'react';
import Head from 'next/head';

import { Logo } from '../../../Header/styles';

import {
  OnboardingModal,
  OnboardingForm,
  OnboardingHeader,
} from '../../../Participate/styles';

import ParticipantDetails from './details';
import Consent from './Consent/index';
import Blocked from './blockingPage';

class FlowWrapper extends Component {
  render() {
    const { query, study, user } = this.props;
    const { step } = query;

    let header;
    switch (step) {
      case 'details':
        header = 'Participant details';
        break;
      case 'consent':
        header = 'Study consent';
        break;
      case 'blocked':
        header = 'Access is blocked';
        break;
      default:
        header = 'Participation';
    }

    return (
      <>
        <Head>
          <title>mindHIVE | {study.title}</title>
        </Head>
        <OnboardingModal id="OnboardingModal">
          <OnboardingForm>
            <OnboardingHeader>
              <Logo>
                <div className="logo">
                  <img src="/static/MindHive_logo.png" alt="icon" height="30" />
                </div>
              </Logo>
              <div>{header}</div>
              <div onClick={this.props.onInterruptRegistration}>
                <a className="closeBtn">&times;</a>
              </div>
            </OnboardingHeader>
            <div>
              {step === 'details' && <ParticipantDetails {...this.props} />}
              {step === 'consent' && <Consent {...this.props} />}
              {step === 'blocked' && <Blocked {...this.props} />}
            </div>
          </OnboardingForm>
        </OnboardingModal>
      </>
    );
  }
}

export default FlowWrapper;
