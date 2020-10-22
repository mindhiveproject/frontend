import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import generate from 'project-name-generator';
import { SignupForm, CreateAccountForm } from '../styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const PARTICIPANT_SIGNUP_MUTATION = gql`
  mutation PARTICIPANT_SIGNUP_MUTATION(
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
      info
    }
  }
`;

class ParticipantSignup extends Component {
  state = {
    username: generate().dashed,
    password: '',
    email: '',
    user: this.props.user,
    study: this.props.study,
    info: {
      age: '',
      zipCode: this.props.user && this.props.user.zipCode,
      under18: this.props.user && this.props.user.under18,
      agreeReceiveUpdates:
        (this.props.user && this.props.user.agreeReceiveUpdates) || false,
      confirmUsername: false,
      agreeTermsConditions: true,
    },
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveToInfoState = e => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  toggleState = e => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: !this.state.info[e.target.name],
      },
    });
  };

  render() {
    return (
      <Mutation
        mutation={PARTICIPANT_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(participantSignUp, { error, loading }) => (
          <SignupForm>
            <CreateAccountForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await participantSignUp({
                  variables: { permissions: ['PARTICIPANT'] },
                });
                // console.log('res', res);
                this.setState({ username: '', password: '', email: '' });
                if (this.props.onClose) this.props.onClose();
                if (this.props.task) {
                  Router.push('/tasks/[slug]', `/tasks/${this.props.task}`);
                  return;
                }
                // redirect to the study page with the query parameter launch
                if (this.props.redirect) {
                  if (this.props.study?.settings?.proceedToFirstTask) {
                    this.props.onStartTheTask(this.props.firstTaskId);
                  }
                } else {
                  Router.push({
                    pathname: `/dashboard`,
                  });
                }
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Create your account</h1>
                <Error error={error} />
                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                  <div className="helpText">
                    Your username <strong>will be visible to scientists</strong>
                    . Proceed with the name we suggest or choose your own (but
                    don't use your real name!).
                  </div>
                </label>
                <label htmlFor="email">
                  <p>Email address</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.saveToState}
                    required
                  />
                </label>
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.saveToState}
                    required
                  />
                </label>

                {!(this.props.user && this.props.user.zipCode) && (
                  <label htmlFor="zipcode">
                    <p>Zip code</p>
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="Enter your zip code"
                      value={this.state.info.zipcode}
                      onChange={this.saveToInfoState}
                    />
                  </label>
                )}

                {!(this.props.user && this.props.user.under18) && (
                  <label htmlFor="age">
                    <p>Age</p>
                    <input
                      type="text"
                      name="age"
                      placeholder="Enter your age"
                      value={this.state.info.age}
                      onChange={this.saveToInfoState}
                    />
                  </label>
                )}

                <div>
                  <label htmlFor="confirmUsername">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="confirmUsername"
                        name="confirmUsername"
                        checked={this.state.info.confirmUsername}
                        onChange={this.toggleState}
                        required
                      />
                      <span>
                        I confirm that my user name does not contain any
                        personally identifiable information (first and last
                        name).
                      </span>
                    </div>
                  </label>
                </div>

                {false && (
                  <div>
                    <label htmlFor="agreeTermsConditions">
                      <div className="checkboxField">
                        <input
                          type="checkbox"
                          id="agreeTermsConditions"
                          name="agreeTermsConditions"
                          checked={this.state.info.agreeTermsConditions}
                          onChange={this.toggleState}
                          required
                        />
                        <span>I agree to the Terms and Conditions</span>
                      </div>
                    </label>
                  </div>
                )}

                <div>
                  <label htmlFor="agreeReceiveUpdates">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="agreeReceiveUpdates"
                        name="agreeReceiveUpdates"
                        checked={this.state.info.agreeReceiveUpdates}
                        onChange={this.toggleState}
                      />
                      <span>
                        I agree to receive notifications and updates related to
                        the studies I follow. NB: you can change your settings
                        at any time in the Dashboard > Account Settings. If you
                        uncheck this box, you will be asked to decide on a
                        case-by-case basis.
                      </span>
                    </div>
                  </label>
                </div>

                <button type="submit">Create account</button>
                <span>
                  By clicking on “Create account” you agree to MindHive’s{' '}
                  <a target="_blank" href="https://mindhive.science/docs/terms">
                    Terms of Service
                  </a>
                  , including our{' '}
                  <a
                    target="_blank"
                    href="https://mindhive.science/docs/privacy"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default ParticipantSignup;
