import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import Error from '../../ErrorMessage/index';
import { SignupButton } from '../styles';

const clientID =
  '1042393944588-od9nbqtdfefltmpq8kjnnhir0lbb14se.apps.googleusercontent.com';

const GOOGLE_SIGNUP_MUTATION = gql`
  mutation GOOGLE_SIGNUP_MUTATION(
    $token: String!
    $user: Json
    $study: Json
    $class: Json
    $info: Json
    $permissions: [Permission]
  ) {
    serviceSignUp(
      token: $token
      user: $user
      study: $study
      class: $class
      info: $info
      permissions: $permissions
    ) {
      id
      username
      permissions
      info
    }
  }
`;

class GoogleSignup extends Component {
  state = {
    user: { ...this.props.user, agreeReceiveUpdates: true },
    study: this.props.study,
    class: this.props.class,
  };

  googleResponse = async (e, signUp) => {
    const res = await signUp({
      variables: { token: e.tokenId, permissions: this.props.permissions },
    });
    console.log('res', res);
    if (this.props.onClose) this.props.onClose();
    if (this.props.redirect) {
      if (this.props.study?.settings?.proceedToFirstTask) {
        this.props.onStartTheTask(this.props.firstTaskId);
      }
    } else {
      Router.push({
        pathname: `/study/all`,
      });
    }
  };

  render() {
    return (
      <Mutation
        mutation={GOOGLE_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(serviceSignUp, { error, loading }) => {
          if (error) return <Error error={error} />;
          return (
            <GoogleLogin
              clientId={clientID}
              render={renderProps => (
                <SignupButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign up with Google
                </SignupButton>
              )}
              onSuccess={e => this.googleResponse(e, serviceSignUp)}
              onFailure={this.googleResponse}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default GoogleSignup;
