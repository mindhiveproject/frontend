import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import generate from 'project-name-generator';
import Router from 'next/router';
import { SignupButton } from '../../Sign/styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const clientID =
  '1042393944588-od9nbqtdfefltmpq8kjnnhir0lbb14se.apps.googleusercontent.com';

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($token: String!, $user: Json, $study: Json) {
    serviceLogin(token: $token, user: $user, study: $study) {
      id
      username
      permissions
      info
    }
  }
`;

class GoogleAuthLogin extends Component {
  googleResponse = async (e, login) => {
    const res = await login({
      variables: {
        token: e.tokenId,
        user: this.props.user,
        study: this.props.study,
      },
    });
    if (this.props.onClose) this.props.onClose();
    if (this.props.task) {
      Router.push('/tasks/[slug]', `/tasks/${this.props.task}`);
      return;
    }
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
