import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import { MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY } from '../../Queries/Component';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    emailLogin(email: $email, password: $password) {
      id
      username
      permissions
    }
  }
`;

class Login extends Component {
  state = {
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
      <>
        <Mutation
          mutation={LOGIN_MUTATION}
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
          {(emailLogin, { error, loading }) => (
            <SignForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await emailLogin();
                this.setState({ password: '', email: '' });
                Router.push({
                  pathname: '/dashboard',
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Login as a teacher or mentor</h3>
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
                <button type="submit">Login</button>
              </fieldset>

              <Link href="/requestreset">
                <a style={{ float: 'right', marginBottom: '20px' }}>
                  Forgot your password?
                </a>
              </Link>
            </SignForm>
          )}
        </Mutation>
      </>
    );
  }
}

export default Login;
