import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';

const SEND_USERNAME_MUTATION = gql`
  mutation SEND_USERNAME_MUTATION($email: String!) {
    sendParticipantUsername(email: $email) {
      message
    }
  }
`;

class SendParticipantUsername extends Component {
  state = {
    email: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation mutation={SEND_USERNAME_MUTATION} variables={this.state}>
        {(sendParticipantUsername, { error, loading, called }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await sendParticipantUsername();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Forgot your username?</h3>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email box for your username.</p>
              )}
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
              <button type="submit">Request username</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default SendParticipantUsername;
