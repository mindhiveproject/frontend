import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import uniqid from 'uniqid';
import generate from 'project-name-generator';
import { TokenForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import joinStudyRedirect from '../../SignFlow/JoinStudyRedirect';

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
      studiesInfo
    }
  }
`;

class GuestParticipantSignup extends Component {
  state = {
    username: generate().dashed,
    email: '',
    password: uniqid(),
    info: this.props.info, // all information that is coming from the registration forms
    study: this.props.study,
  };

  submitForm = async tokenSignUp => {
    const res = await tokenSignUp({
      variables: { permissions: ['PARTICIPANT'] },
    });
    const { signUp } = res.data;
    this.setState({ email: '', username: '', password: '' });
    alert(
      `Please save this information. Your username ${this.state.username} and password ${this.state.password}`
    );
    joinStudyRedirect(this.props.study, signUp);
  };

  render() {
    return (
      <Mutation
        mutation={GUEST_PARTICIPANT_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(tokenSignUp, { error, loading }) => (
          <TokenForm>
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <div className="agreementText">
                <div>Prefer to participate as a guest?</div>
                <span>
                  By clicking{' '}
                  <a
                    className="linkBtn"
                    onClick={() => {
                      this.submitForm(tokenSignUp);
                    }}
                  >
                    continue without an account
                  </a>{' '}
                  you agree to MindHive’s{' '}
                  <a target="_blank" href="https://mindhive.science/docs/terms">
                    Terms or Service
                  </a>{' '}
                  and{' '}
                  <a
                    target="_blank"
                    href="https://mindhive.science/docs/privacy"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>
            </fieldset>
          </TokenForm>
        )}
      </Mutation>
    );
  }
}

export default GuestParticipantSignup;
