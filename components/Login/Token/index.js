import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import SendParticipantUsername from './sendUsername';

const TOKEN_LOGIN_MUTATION = gql`
  mutation TOKEN_LOGIN_MUTATION($username: String!) {
    tokenLogin(username: $username) {
      id
      username
      permissions
    }
  }
`;

class TokenLogin extends Component {
  state = {
    username: '',
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
          mutation={TOKEN_LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
        >
          {(tokenLogin, { error, loading }) => (
            <SignForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await tokenLogin();
                console.log('res', res);
                this.setState({ username: '' });
                Router.push({
                  pathname: '/dashboard',
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>Login for participants</h3>
                <Error error={error} />
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
                <button type="submit">Log in</button>
              </fieldset>
            </SignForm>
          )}
        </Mutation>
        <SendParticipantUsername />
      </>
    );
  }
}

export default TokenLogin;
