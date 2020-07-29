import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import uniqid from 'uniqid';
import generate from 'project-name-generator';
import { TokenForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const GUEST_PARTICIPANT_SIGNUP_MUTATION = gql`
  mutation GUEST_PARTICIPANT_SIGNUP_MUTATION(
    $email: String
    $username: String!
    $password: String!
    $user: Json
    $study: Json
    $info: Json
    $permissions: [Permission]
  ) {
    signUp(
      email: $email
      username: $username
      password: $password
      user: $user
      study: $study
      info: $info
      permissions: $permissions
    ) {
      id
      username
      permissions
    }
  }
`;

class GuestParticipantSignup extends Component {
  state = {
    email: '',
    username: generate().dashed,
    password: uniqid(),
    user: this.props.user,
    study: this.props.study,
    info: {
      age: '',
      zipcode: this.props.user && this.props.user.zipCode,
      under18: this.props.user && this.props.user.under18,
    },
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={GUEST_PARTICIPANT_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(tokenSignUp, { error, loading }) => (
          <TokenForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              const res = await tokenSignUp({
                variables: { permissions: ['PARTICIPANT'] },
              });
              alert(
                `Your username ${this.state.username} and password ${this.state.password}`
              );
              this.setState({ email: '', username: '', password: '' });
              if (this.props.onClose) this.props.onClose();
              if (this.props.redirect) {
                Router.push(
                  '/studies/[slug]',
                  `/studies/${this.props.redirect}`
                );
              } else {
                Router.push({
                  pathname: `/study/all`,
                });
              }
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <button className="linkBtn" type="submit">
                Continue without an account
              </button>
            </fieldset>
          </TokenForm>
        )}
      </Mutation>
    );
  }
}

export default GuestParticipantSignup;
