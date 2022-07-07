import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignupForm, CreateAccountForm, SignupButton } from '../../Sign/styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import joinStudyRedirect from '../../SignFlow/JoinStudyRedirect';

import GoogleLogin from '../Google/index';

const PARTICIPANT_LOGIN_MUTATION = gql`
  mutation PARTICIPANT_LOGIN_MUTATION(
    $usernameEmail: String!
    $password: String!
    $info: Json
    $study: Json
  ) {
    participantLogin(
      usernameEmail: $usernameEmail
      password: $password
      info: $info
      study: $study
    ) {
      id
      username
      permissions
      studiesInfo
    }
  }
`;

class Login extends Component {
  state = {
    usernameEmail: '',
    password: '',
    info: this.props.info, // all information that is coming from the registration forms
    study: this.props.study,
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <Mutation
          mutation={PARTICIPANT_LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
        >
          {(login, { error, loading }) => (
            <SignupForm>
              <CreateAccountForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  this.setState({ password: '', usernameEmail: '' });
                  const res = await login();
                  const { participantLogin } = res.data;
                  joinStudyRedirect(this.props.study, participantLogin);
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h1>Login</h1>
                  <h3>Enter your email or username</h3>
                  <Error error={error} />

                  <label htmlFor="usernameEmail">
                    Username or email
                    <input
                      type="text"
                      name="usernameEmail"
                      placeholder="Enter your username or email"
                      value={this.state.usernameEmail}
                      onChange={this.saveToState}
                    />
                  </label>

                  <label htmlFor="password">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </label>
                  <button type="submit">Login</button>
                </fieldset>

                <GoogleLogin study={this.props.study} info={this.props.info} />

                <Link href="/requestreset">
                  <a
                    style={{
                      float: 'right',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    Forgot your password?
                  </a>
                </Link>
              </CreateAccountForm>
            </SignupForm>
          )}
        </Mutation>
      </>
    );
  }
}

export default Login;
