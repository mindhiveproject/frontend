import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignupForm, CreateAccountForm } from '../styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $username: String!
    $password: String!
    $permissions: [Permission]
  ) {
    signUp(
      email: $email
      username: $username
      password: $password
      permissions: $permissions
    ) {
      id
      username
      permissions
    }
  }
`;

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(emailSignUp, { error, loading }) => (
          <SignupForm>
            <CreateAccountForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await emailSignUp({
                  variables: { permissions: ['TEACHER'] },
                });
                this.setState({
                  username: '',
                  password: '',
                  email: '',
                  permissions: '',
                });
                Router.push({
                  pathname: '/me',
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Sign up as a teacher</h1>
                <Error error={error} />
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
                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={this.state.username}
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
                <button type="submit">Sign up</button>
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default Signup;
