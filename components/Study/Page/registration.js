// show this if there is no participant consent for this study
import React, { Component } from 'react';
import Link from 'next/link';

import GuestParticipantSignup from '../../Sign/Participant/guest';
import ParticipantSignup from '../../Sign/Participant/index';
import ParticipantLogin from '../../Login/Participant/index';

import { StyledStudy, StyledLink, StyledButtons } from '../styles';

class StudyRegistration extends Component {
  state = {
    login: false,
    signup: false,
  };

  render() {
    const { study, user } = this.props;
    console.log('user', user);
    return (
      <div>
        <h2>How would you like to participate in the study?</h2>

        <button
          onClick={() => {
            this.setState({ signup: true });
          }}
        >
          Sign up with email
        </button>

        {this.state.login && (
          <ParticipantLogin redirect={study.id} user={user} />
        )}
        {this.state.signup && (
          <ParticipantSignup redirect={study.id} user={user} />
        )}

        {true && (
          <>
            <p>Prefer to participate as a guest? Continue without an acount</p>
            <GuestParticipantSignup redirect={study.id} />
          </>
        )}

        <p>Already have an account?</p>
        <button
          onClick={() => {
            this.setState({ login: true });
          }}
        >
          Login here
        </button>
      </div>
    );
  }
}

export default StudyRegistration;

// <h3>
//   Please
//   <Link
//     href={{
//       pathname: `/sign/participant`,
//       query: { study: study.id },
//     }}
//   >
//     <StyledLink> sign up </StyledLink>
//   </Link>
//   as a participant or just
//   <Link
//     href={{
//       pathname: `/login/participant`,
//       query: { study: study.id },
//     }}
//   >
//     <StyledLink> log in here </StyledLink>
//   </Link>
//   with your username.
// </h3>
