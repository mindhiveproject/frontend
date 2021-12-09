import React, { Component } from 'react';
import Link from 'next/link';

import { OnboardingHeader } from '../styles';
import { SignupForm, SignupButton } from '../../Sign/styles';

import { Logo } from '../../Header/styles';

import GoogleSignup from '../../Sign/Google/index';
import GuestParticipantSignup from '../../Sign/Participant/guest';

class HowToJoin extends Component {
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
          <div>Account creation</div>
          <Link
            href={{
              pathname: `/studies/${study.slug}`,
            }}
          >
            <a className="closeBtn">&times;</a>
          </Link>
        </OnboardingHeader>

        <SignupForm>
          <h1>How would you like to join?</h1>
          <div className="studentSignupOptions">
            <Link
              href={{
                pathname: `/join/sign`,
                query: {
                  ...this.state,
                  mode: 'signup',
                  id: study.id,
                },
              }}
            >
              <SignupButton>
                <div>
                  <img
                    src="/static/assets/signup-email.png"
                    alt="icon"
                    height="20"
                  />
                </div>
                <div> Sign up with email/username</div>
              </SignupButton>
            </Link>

            <GoogleSignup
              study={study}
              info={this.state} // all information from registration forms
              permissions={['PARTICIPANT']}
            />
          </div>

          <div>
            <div className="loginHereLine">
              <span>Already have an account?</span>
              <span>
                <Link
                  href={{
                    pathname: `/join/sign`,
                    query: {
                      ...this.state,
                      mode: 'login',
                      id: study.id,
                    },
                  }}
                >
                  <a
                    style={{
                      borderBottom: '1px solid grey',
                      cursor: 'pointer',
                    }}
                  >
                    Login here
                  </a>
                </Link>
              </span>
            </div>
          </div>

          {study.settings && study.settings.guestParticipation && (
            <div className="guestParticipationBlock">
              <>
                <GuestParticipantSignup info={this.state} study={study} />
              </>
            </div>
          )}
        </SignupForm>
      </div>
    );
  }
}

export default HowToJoin;
