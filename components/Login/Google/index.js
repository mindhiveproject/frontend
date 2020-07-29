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
  mutation GOOGLE_LOGIN_MUTATION($token: String!) {
    serviceLogin(token: $token) {
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
      },
    });
    if (this.props.onClose) this.props.onClose();
    if (this.props.redirect) {
      // Router.push('/studies/[slug]', `/studies/${this.props.redirect}`);
      Router.push({
        pathname: '/tasks/run',
        as: `/tasks/run`,
        query: {
          id:
            this.props.study.tasks &&
            this.props.study.tasks.length &&
            this.props.study.tasks.map(task => task.id)[0],
          policy:
            (res &&
              res.data &&
              res.data.serviceLogin &&
              res.data.serviceLogin.info &&
              res.data.serviceLogin.info[this.props.study.id] &&
              res.data.serviceLogin.info[this.props.study.id].data) ||
            'fallback',
          study: this.props.study.id,
          s: this.props.redirect,
        },
      });
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
                  Login with Google
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
