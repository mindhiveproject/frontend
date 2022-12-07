import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import { MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY } from '../Queries/Component';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $username: String!
    $password: String!
  ) {
    emailSignUp(email: $email, username: $username, password: $password) {
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
        refetchQueries={[
          { query: CURRENT_USER_RESULTS_QUERY },
          {
            query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
            variables: { taskType: 'TASK' },
          },
          {
            query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
            variables: { taskType: 'SURVEY' },
          },
          {
            query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
            variables: { taskType: 'BLOCK' },
          },
        ]}
      >
        {(emailSignUp, { error, loading }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await emailSignUp();
              this.setState({ username: '', password: '', email: '' });
              Router.push({
                pathname: `/dashboard`,
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Sign up as a teacher or mentor</h3>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign up</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default Signup;
