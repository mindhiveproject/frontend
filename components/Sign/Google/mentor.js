import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import Error from '../../ErrorMessage/index';
import { SignupButton } from '../styles';
import joinStudyRedirect from '../../SignFlow/JoinStudyRedirect';

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
      studiesInfo
    }
  }
`;

class GoogleSignup extends Component {
  state = {
    info: this.props.info, // pass all collected in the form information
    study: this.props.study,
    class: this.props.class,
  };

  googleResponse = async (e, signUp) => {
    const res = await signUp({
      variables: { token: e.tokenId, permissions: this.props.permissions },
    });
    const { serviceSignUp } = res.data;
    joinStudyRedirect(this.props.study, serviceSignUp);
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
                  <div>
                    <img
                      src="/static/assets/signup-google.png"
                      alt="icon"
                      height="20"
                    />
                  </div>
                  <div>Sign up with Google</div>
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
