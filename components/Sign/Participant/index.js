import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import generate from 'project-name-generator';
import { TokenForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const PARTICIPANT_SIGNUP_MUTATION = gql`
  mutation PARTICIPANT_SIGNUP_MUTATION(
    $email: String
    $username: String!
    $password: String!
  ) {
    participantSignUp(email: $email, username: $username, password: $password) {
      id
      username
      permissions
    }
  }
`;

class Signup extends Component {
  state = {
    username: generate().dashed,
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
        mutation={PARTICIPANT_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(participantSignUp, { error, loading }) => (
          <TokenForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await participantSignUp();
              console.log('res', res);
              this.setState({ username: '', password: '', email: '' });
              if (this.props.redirect) {
                Router.push({
                  pathname: `/studies/page`,
                  query: { id: this.props.redirect },
                });
              } else {
                Router.push({
                  pathname: `/studies/all`,
                });
              }
              // Router.push({
              //   pathname: this.props.redirect
              //     ? `/study/${this.props.redirect}`
              //     : '/studies/all',
              // });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Create your account</h3>
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
                <p>
                  Your username <strong>will be visible to scientists</strong>.
                  Proceed with the name we suggest or choose your own (but don't
                  use your real name!).
                </p>
              </label>
              <label htmlFor="email">
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                  required
                />
                <p>Helper text</p>
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                  required
                />
                <p>Helper text</p>
              </label>

              <div>
                <label htmlFor="confirmUsername">
                  <input
                    type="checkbox"
                    id="confirmUsername"
                    name="confirmUsername"
                    value="checked"
                    required
                  />
                  I confirm that my user name does not contain any personally
                  identifiable information (first and last name).
                </label>
              </div>

              <button type="submit">Next Step</button>
              <p>
                By clicking on "Next Step", you agree to mindHive's Terms of
                Service, including our Privacy Policy.
              </p>
            </fieldset>
          </TokenForm>
        )}
      </Mutation>
    );
  }
}

export default Signup;
