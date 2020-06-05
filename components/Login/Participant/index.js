import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { TokenForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const PARTICIPANT_LOGIN_MUTATION = gql`
  mutation PARTICIPANT_LOGIN_MUTATION(
    $email: String
    $username: String
    $password: String!
  ) {
    participantLogin(email: $email, username: $username, password: $password) {
      id
      username
      permissions
    }
  }
`;

class Login extends Component {
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
      <>
        <Mutation
          mutation={PARTICIPANT_LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
        >
          {(participantLogin, { error, loading }) => (
            <TokenForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await participantLogin();
                console.log('res', res);
                this.setState({ password: '', email: '', username: '' });
                Router.push({
                  pathname: this.props.redirect ? '/exp' : '/bank',
                  query: { id: this.props.redirect },
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Login as a participant</h3>
                <p>Enter your email or username</p>
                <Error error={error} />
                <label htmlFor="username">
                  Username
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Login</button>
              </fieldset>

              <Link href="/requestreset/participant">
                <a style={{ float: 'right' }}>Forgot your password?</a>
              </Link>
            </TokenForm>
          )}
        </Mutation>
      </>
    );
  }
}

export default Login;
