import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignupForm, CreateAccountForm, SignupButton } from '../../Sign/styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const PARTICIPANT_LOGIN_MUTATION = gql`
  mutation PARTICIPANT_LOGIN_MUTATION(
    $usernameEmail: String!
    $password: String!
    $user: Json
    $study: Json
  ) {
    participantLogin(
      usernameEmail: $usernameEmail
      password: $password
      user: $user
      study: $study
    ) {
      id
      username
      permissions
      info
    }
  }
`;

class Login extends Component {
  state = {
    usernameEmail: '',
    email: '',
    user: this.props.user,
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
          {(participantLogin, { error, loading }) => (
            <SignupForm>
              <CreateAccountForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await participantLogin();
                  this.setState({ password: '', usernameEmail: '' });
                  this.props.onClose();
                  if (this.props.redirect) {
                    Router.push(
                      '/study/[slug]',
                      `/study/${this.props.redirect}`
                    );
                  } else {
                    Router.push({
                      pathname: `/studies/all`,
                    });
                  }
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h1>Login as a participant</h1>
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

                <Link href="/requestreset">
                  <a style={{ float: 'right' }}>Forgot your password?</a>
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
