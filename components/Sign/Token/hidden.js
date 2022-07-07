import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import uniqid from 'uniqid';
import generate from 'project-name-generator';
import { TokenForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';

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
              this.setState({ username: '', token: '', email: '' });
              if (this.props.redirect) {
                Router.push({
                  pathname: `${this.props.isCustom ? '/e' : '/exp/run'}`,
                  query: { id: this.props.redirect },
                });
              } else {
                Router.push({
                  pathname: '/dashboard',
                });
              }
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
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
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.saveToState}
                  hidden
                />
              </label>
              <label htmlFor="username">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                  hidden
                />
              </label>
              <button type="submit">Participate as a guest</button>
            </fieldset>
          </TokenForm>
        )}
      </Mutation>
    );
  }
}

export default TokenSignup;
