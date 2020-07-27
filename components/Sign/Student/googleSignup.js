import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

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
    }
  }
`;

class GoogleSignup extends Component {
  state = {
    user: this.props.user,
    study: this.props.study,
    class: this.props.class,
    info: {
      age: '',
      zipcode: this.props.user && this.props.user.zipCode,
      under18: this.props.user && this.props.user.under18,
    },
  };

  googleResponse = async (e, signUp) => {
    console.log('e', e);
    const res = await signUp({
      variables: { token: e.tokenId, permissions: ['STUDENT'] },
    });
    console.log('res', res);
    if (this.props.redirect) {
      Router.push('/studies/[slug]', `/studies/${this.props.redirect}`);
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
        {(serviceSignUp, { error, loading }) => (
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
        )}
      </Mutation>
    );
  }
}

export default GoogleSignup;
