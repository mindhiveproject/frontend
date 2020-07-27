import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import generate from 'project-name-generator';
import Router from 'next/router';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { STUDENT_SIGNUP_MUTATION } from './emailSignup';

const clientID =
  '1042393944588-od9nbqtdfefltmpq8kjnnhir0lbb14se.apps.googleusercontent.com';

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
      variables: {
        username: (e.profileObj && e.profileObj.name) || generate().dashed,
        email: e.profileObj && e.profileObj.email,
        password: e.accessToken,
        permissions: ['STUDENT'],
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
        mutation={STUDENT_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(serviceSignUp, { error, loading }) => (
          <div>
            Google Signup
            <GoogleLogin
              clientId={clientID}
              buttonText="Login"
              onSuccess={e => this.googleResponse(e, serviceSignUp)}
              onFailure={this.googleResponse}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

export default GoogleSignup;
