import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignupForm, CreateAccountForm, SignupButton } from '../Sign/styles';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../User/index';

import GoogleLogin from './Google/index';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($usernameEmail: String!, $password: String!) {
    login(usernameEmail: $usernameEmail, password: $password) {
      id
      username
      permissions
    }
  }
`;

class Login extends Component {
  state = {
    usernameEmail: '',
    password: '',
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
          mutation={LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
        >
          {(login, { error, loading }) => (
            <SignupForm>
              <CreateAccountForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await login();
                  this.setState({
                    password: '',
                    usernameEmail: '',
                  });
                  if (this.props.redirect) {
                    Router.push(
                      '/studies/[slug]',
                      `/studies/${this.props.redirect}`
                    );
                  } else {
                    Router.push({
                      pathname: `/study/all`,
                    });
                  }
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h1>Login</h1>
                  <h3>Enter your username or email</h3>
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
                  <GoogleLogin />
                </fieldset>

                <Link href="/requestreset">
                  <a style={{ float: 'right', marginTop: '20px' }}>
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
export { LOGIN_MUTATION };
