import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import SignedInUser from './SignedInUser';
import NotSignedInUser from './NotSignedInUser';

import { Logo } from '../Header/styles';

import { OnboardingModal, OnboardingForm, OnboardingHeader } from './styles';

class FlowWrapper extends Component {
  render() {
    const { query, study, user } = this.props;
    const { step } = query;

    let header;
    switch (step) {
      case 'select':
        header = 'Participation';
        break;
      case 'signup':
        header = 'Participant details';
        break;
      case 'login':
        header = 'Login';
        break;
      case 'details':
        header = 'Participant details';
        break;
      case 'consent':
        header = 'Study consent';
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
              <Link
                href={{
                  pathname: `/studies/${study.slug}`,
                }}
              >
                <a className="closeBtn">&times;</a>
              </Link>
            </OnboardingHeader>
            {user ? (
              <SignedInUser query={query} study={study} user={user} />
            ) : (
              <NotSignedInUser query={query} study={study} />
            )}
          </OnboardingForm>
        </OnboardingModal>
      </>
    );
  }
}

export default FlowWrapper;
