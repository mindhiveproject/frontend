import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignupButton } from '../../Sign/styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import joinStudyRedirect from '../../SignFlow/JoinStudyRedirect';

const clientID =
  '1042393944588-od9nbqtdfefltmpq8kjnnhir0lbb14se.apps.googleusercontent.com';

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($token: String!, $info: Json, $study: Json) {
    serviceLogin(token: $token, info: $info, study: $study) {
      id
      username
      permissions
      studiesInfo
    }
  }
`;

class GoogleAuthLogin extends Component {
  googleResponse = async (e, login) => {
    const res = await login({
      variables: {
        token: e.tokenId,
        info: this.props.info,
        study: this.props.study,
      },
    });
    const { serviceLogin } = res.data;
    // if login happens inside of "participate" flow
    if (this.props.proceedTo) {
      Router.push({
        pathname: '/participate/details',
        query: { id: this.props.proceedTo, guest: false },
      });
      return;
    }
    joinStudyRedirect(this.props.study, serviceLogin);
  };

  render() {
    return (
      <Mutation
        mutation={GOOGLE_LOGIN_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(serviceLogin, { error, loading }) => {
          if (error) return <Error error={error} />;
          return (
            <GoogleLogin
              clientId={clientID}
              render={renderProps => (
                <SignupButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <div>
                    <img
                      src="/static/assets/signup-google.png"
                      alt="icon"
                      height="20"
                    />
                  </div>
                  <div>Login with Google</div>
                </SignupButton>
              )}
              onSuccess={e => this.googleResponse(e, serviceLogin)}
              onFailure={this.googleResponse}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default GoogleAuthLogin;
