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

class EmptyTokenSignup extends Component {
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
              if (this.props.experiment.id) {
                Router.push({
                  pathname: '/e',
                  query: { id: this.props.experiment.id },
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
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">
                Participate in {this.props.experiment.title}
              </button>
            </fieldset>
          </TokenForm>
        )}
      </Mutation>
    );
  }
}

export default EmptyTokenSignup;
