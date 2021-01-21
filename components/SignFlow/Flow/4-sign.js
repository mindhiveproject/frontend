import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { OnboardingHeader } from '../styles';
import { SignupForm, SignupButton } from '../../Sign/styles';

import { Logo } from '../../Header/styles';

import ParticipantSignup from '../../Sign/Participant/index';
import ParticipantLogin from '../../Login/Participant/index';

class Join extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { study, user } = this.props;
    return (
      <div>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>
          {this.state.mode === 'login' && <div>Login</div>}
          {this.state.mode === 'signup' && <div>Account creation</div>}
          <Link
            href={{
              pathname: `/studies/${study.slug}`,
            }}
          >
            <a className="closeBtn">&times;</a>
          </Link>
        </OnboardingHeader>

        {this.state.mode === 'login' && (
          <ParticipantLogin
            study={study}
            info={this.state} // all information from registration forms
          />
        )}

        {this.state.mode === 'signup' && (
          <ParticipantSignup
            study={study}
            info={this.state} // all information from registration forms
          />
        )}
      </div>
    );
  }
}

export default Join;
