import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import uniqid from 'uniqid';
import generate from 'project-name-generator';
import { TokenForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $token: String!
    $email: String
  ) {
    tokenSignUp(username: $username, token: $token, email: $email) {
      id
      username
      permissions
    }
  }
`;

class TokenSignup extends Component {
  state = {
    username: generate().dashed,
    token: uniqid(),
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
        {(tokenSignUp, { error, loading }) => (
          <TokenForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await tokenSignUp();
              console.log('res', res);
              this.setState({ username: '', token: '', email: '' });
              if (this.props.redirect) {
                Router.push({
                  pathname: '/exp/run',
                  query: { id: this.props.redirect },
                });
              } else {
                Router.push({
                  pathname: '/bank',
                });
              }
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Sign up as a participant</h3>
              <Error error={error} />
              <label htmlFor="token">
                <input
                  type="text"
                  name="token"
                  placeholder="token"
                  value={this.state.token}
                  onChange={this.saveToState}
                  hidden
                />
              </label>
              <label htmlFor="username">
                Username
                <p>
                  Choose your own username below (don't use your real name!) or
                  proceed with the one we suggest. Remember or write it down for
                  future use. Using a single username is not obligatory but can
                  be helpful: it will allow scientists to link your data between
                  multiple studies which may help prevent you having to answer
                  the same questions multiple times.
                </p>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="username">
                Email
                <p>
                  Your email address will not be made available to researchers.
                  (a) it will be used as a recovery email in case you forget
                  your username (b) you may receive an email if a follow-up
                  study is available for a study you've already. You can of
                  course opt out of these emails at any time. You don't have to
                  give us your email address.
                </p>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign up</button>
            </fieldset>
          </TokenForm>
        )}
      </Mutation>
    );
  }
}

export default TokenSignup;
