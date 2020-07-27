import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import generate from 'project-name-generator';
import Router from 'next/router';
import { SignupButton } from '../../Sign/styles';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const clientID =
  '1042393944588-od9nbqtdfefltmpq8kjnnhir0lbb14se.apps.googleusercontent.com';

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($token: String!) {
    serviceLogin(token: $token) {
      id
      username
      permissions
    }
  }
`;

class GoogleAuthLogin extends Component {
  googleResponse = async (e, login) => {
    const res = await login({
      variables: {
        token: e.tokenId,
      },
    });
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
        mutation={GOOGLE_LOGIN_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(serviceLogin, { error, loading }) => (
          <GoogleLogin
            clientId={clientID}
            render={renderProps => (
              <SignupButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login with Google
              </SignupButton>
            )}
            onSuccess={e => this.googleResponse(e, serviceLogin)}
            onFailure={this.googleResponse}
          />
        )}
      </Mutation>
    );
  }
}

export default GoogleAuthLogin;
