import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';

import uniqid from 'uniqid';
import generate from 'project-name-generator';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

import ConsentScreen from './consentScreen';

import joinStudyRedirect from '../../SignFlow/JoinStudyRedirect';
import joinStudyAsGuestRedirect from './JoinStudyAsGuestRedirect';

import { OnboardingDetails } from '../styles';

const JOIN_STUDY = gql`
  mutation JOIN_STUDY($id: ID!, $info: Json, $study: Json) {
    joinStudy(id: $id, info: $info, study: $study) {
      id
      username
      permissions
      studiesInfo
    }
  }
`;

const JOIN_STUDY_AS_GUEST = gql`
  mutation JOIN_STUDY_AS_GUEST($id: ID!, $info: Json, $study: Json) {
    joinStudyAsGuest(id: $id, info: $info, study: $study) {
      id
      publicId
      studiesInfo
    }
  }
`;

const GUEST_PARTICIPANT_SIGNUP_MUTATION = gql`
  mutation GUEST_PARTICIPANT_SIGNUP_MUTATION(
    $email: String
    $username: String!
    $password: String!
    $user: Json
    $study: Json
    $info: Json
    $permissions: [Permission]
  ) {
    signUp(
      email: $email
      username: $username
      password: $password
      user: $user
      study: $study
      info: $info
      permissions: $permissions
    ) {
      id
      username
      permissions
      studiesInfo
    }
  }
`;

class Consent extends Component {
  state = {
    covered: false, // default of the page for saving of covered consent
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
    numberOfConsents: this.props.study?.consent.length,
    activeConsent: 0,
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  recordMyConsent = async (
    consentId,
    decision,
    join,
    joinAsGuest,
    signUpAsGuest
  ) => {
    if (this.state.activeConsent + 1 < this.state.numberOfConsents) {
      this.setState({
        [`consent-${consentId}`]: decision,
        activeConsent: this.state.activeConsent + 1,
      });
    } else if (this.props.user) {
      if (this.props.query.guest === 'true') {
        const res = await joinAsGuest({
          variables: {
            id: this.props.study.id,
            info: {
              ...this.state,
              [`consent-${consentId}`]: decision,
              guest: true, // join as a guest
            },
            study: this.props.study,
          },
        });
        const { joinStudyAsGuest } = res.data;
        joinStudyAsGuestRedirect(this.props.study, joinStudyAsGuest);
      } else {
        const res = await join({
          variables: {
            id: this.props.study.id,
            info: { ...this.state, [`consent-${consentId}`]: decision },
            study: this.props.study,
          },
        });
        const { joinStudy } = res.data;
        joinStudyRedirect(this.props.study, joinStudy);
      }
    } else {
      // make new guest account
      const username = generate().dashed;
      const password = uniqid();
      const res = await signUpAsGuest({
        variables: {
          info: { ...this.state, [`consent-${consentId}`]: decision },
          study: this.props.study,
          permissions: ['PARTICIPANT'],
          email: '',
          username,
          password,
        },
      });
      const { signUp } = res.data;
      alert(
        `Please save this information. Your username ${username} and password ${password}`
      );
      joinStudyRedirect(this.props.study, signUp);
    }
  };

  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { user, study, query } = this.props;
    const { step, guest } = query;
    const { consent } = study;

    // compute whether the person is under 18
    let under18;
    if (this.state.bd) {
      const diff = Date.now() - this.state.bd;
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.2425;
      under18 = diff / millisecondsInYear < 18;
    }

    return (
      <OnboardingDetails>
        <Mutation
          mutation={GUEST_PARTICIPANT_SIGNUP_MUTATION}
          refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
        >
          {signUpAsGuest => (
            <Mutation
              mutation={JOIN_STUDY_AS_GUEST}
              refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
            >
              {joinStudyAsGuest => (
                <Mutation
                  mutation={JOIN_STUDY}
                  refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
                >
                  {(joinStudy, { loading, error }) => (
                    <ConsentScreen
                      under18={under18}
                      consent={consent[this.state.activeConsent]}
                      sona={this.state.sona}
                      studentNYC={this.state.studentNYC}
                      covered={this.state.covered}
                      updateState={this.updateState}
                      consentNumber={this.state.activeConsent}
                      numberOfConsents={this.state.numberOfConsents}
                      recordMyConsent={this.recordMyConsent}
                      signUpAsGuest={signUpAsGuest}
                      joinStudyAsGuest={joinStudyAsGuest}
                      joinStudy={joinStudy}
                    >
                      <>
                        {under18 && (
                          <>
                            <div>
                              <label htmlFor="parentname">
                                <p>Parent name</p>
                                <input
                                  type="text"
                                  id="parentname"
                                  name="parentname"
                                  onChange={this.updateState}
                                />
                              </label>
                            </div>

                            <div>
                              <label htmlFor="parentemail">
                                <p>Parent email address</p>
                                <input
                                  type="email"
                                  id="parentemail"
                                  name="parentemail"
                                  onChange={this.updateState}
                                />
                              </label>
                            </div>

                            <div>
                              <label htmlFor="kidname">
                                <p>Your name</p>
                                <input
                                  type="text"
                                  id="kidname"
                                  name="kidname"
                                  onChange={this.updateState}
                                />
                              </label>
                            </div>
                          </>
                        )}
                      </>
                    </ConsentScreen>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </OnboardingDetails>
    );
  }
}

export default Consent;
