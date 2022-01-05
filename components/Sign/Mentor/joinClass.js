import React, { Component } from 'react';

import MentorEmailSignup from './emailSignup';
import GoogleSignup from '../Google/mentor';

import { SignupButton } from '../styles';

import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';

import WithProfile from './withProfile';

class JoinClass extends Component {
  state = {
    activePage: 'choose',
    classCode: this.props.classCode,
    classId: this.props.classId,
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <ContainerOnlyForProfile>
          <WithProfile id={this.state.classId} />
        </ContainerOnlyForProfile>

        <ContainerOnlyForNoProfile>
          {this.state.activePage === 'choose' && (
            <>
              <h1>How would you like to join MindHive?</h1>
              <div className="studentSignupOptions">
                <GoogleSignup
                  class={{ code: this.state.classCode }}
                  permissions={['MENTOR']}
                />

                <SignupButton
                  onClick={() => {
                    this.setState({ activePage: 'createAccount' });
                  }}
                >
                  <div>
                    <img
                      src="/static/assets/signup-email.png"
                      alt="icon"
                      height="20"
                    />
                  </div>
                  <div>Sign up with email/username</div>
                </SignupButton>
              </div>
            </>
          )}

          {this.state.activePage === 'createAccount' && (
            <>
              <MentorEmailSignup class={{ code: this.state.classCode }} />
            </>
          )}
        </ContainerOnlyForNoProfile>
      </>
    );
  }
}

export default JoinClass;
