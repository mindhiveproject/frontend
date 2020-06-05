import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';

const PARTICIPANT_REQUEST_RESET_MUTATION = gql`
  mutation PARTICIPANT_REQUEST_RESET_MUTATION($email: String!) {
    participantRequestReset(email: $email) {
      message
    }
  }
`;

class ParticipantRequestReset extends Component {
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
      <Mutation
        mutation={PARTICIPANT_REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(participantReset, { error, loading, called }) => (
          <SignForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await participantReset();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Request a password reset</h3>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email box for a reset link.</p>
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
              <button type="submit">Request reset</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default ParticipantRequestReset;
