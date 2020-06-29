import React, { Component } from 'react';
import Link from 'next/link';

import GuestParticipantSignup from '../../Sign/Participant/guest';
import ParticipantSignup from '../../Sign/Participant/index';
import ParticipantLogin from '../../Login/Participant/index';

import { SignupForm, SignupButton } from '../../Sign/styles';

class StudyRegistration extends Component {
  state = {
    login: false,
    signup: false,
  };

  render() {
    const { study, user } = this.props;
    console.log('user', user);
    return (
      <>
        {!this.state.login && !this.state.signup && (
          <SignupForm>
            <h1>How would you like to join?</h1>

            <SignupButton
              onClick={() => {
                this.setState({ signup: true });
              }}
            >
              Sign up with email/username
            </SignupButton>

            <div>
              <span>
                <>Already have an account?</>
                <> </>
                <a
                  style={{ borderBottom: '1px solid grey', cursor: 'pointer' }}
                  onClick={() => {
                    this.setState({ login: true });
                  }}
                >
                  Login here
                </a>
              </span>
            </div>

            {study.settings && study.settings.guestParticipation && (
              <div className="guestParticipationBlock">
                <>
                  <div>Prefer to participate as a guest?</div>
                  <GuestParticipantSignup
                    redirect={study.id}
                    user={user}
                    study={study}
                  />
                </>
              </div>
            )}
          </SignupForm>
        )}

        {this.state.login && (
          <ParticipantLogin redirect={study.id} user={user} study={study} />
        )}

        {this.state.signup && (
          <ParticipantSignup redirect={study.id} user={user} study={study} />
        )}
      </>
    );
  }
}

export default StudyRegistration;
