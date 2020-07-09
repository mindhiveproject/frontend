import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignupForm, CreateAccountForm } from '../Sign/styles';
import Error from '../ErrorMessage/index';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($usernameEmail: String!) {
    requestReset(usernameEmail: $usernameEmail) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    usernameEmail: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(participantReset, { error, loading, called }) => (
          <SignupForm>
            <CreateAccountForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await participantReset();
                this.setState({ usernameEmail: '' });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Request a password reset</h1>
                <Error error={error} />
                {!error && !loading && called && (
                  <p>Success! Check the email box for a reset link.</p>
                )}
                <label htmlFor="usernameEmail">
                  Email or username
                  <input
                    type="usernameEmail"
                    name="usernameEmail"
                    placeholder="Enter your email or username"
                    value={this.state.usernameEmail}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Request reset</button>
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
