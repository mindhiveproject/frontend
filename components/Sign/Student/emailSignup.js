import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import generate from 'project-name-generator';
import { SignupForm, CreateAccountForm } from '../styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const STUDENT_SIGNUP_MUTATION = gql`
  mutation STUDENT_SIGNUP_MUTATION(
    $email: String
    $username: String!
    $password: String!
    $user: Json
    $study: Json
    $class: Json
    $info: Json
    $permissions: [Permission]
  ) {
    signUp(
      email: $email
      username: $username
      password: $password
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

class StudentSignup extends Component {
  state = {
    username: generate().dashed,
    password: '',
    email: '',
    user: this.props.user,
    study: this.props.study,
    class: this.props.class,
    info: {
      age: '',
      zipcode: this.props.user && this.props.user.zipCode,
      under18: this.props.user && this.props.user.under18,
      useTeacherEmail: false,
    },
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveToInfoState = e => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <Mutation
        mutation={STUDENT_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(studentSignUp, { error, loading }) => (
          <SignupForm>
            <CreateAccountForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await studentSignUp({
                  variables: { permissions: ['STUDENT'] },
                });
                console.log('res', res);
                this.setState({ username: '', password: '', email: '' });
                if (this.props.redirect) {
                  Router.push('/study/[slug]', `/study/${this.props.redirect}`);
                } else {
                  Router.push({
                    pathname: `/studies/all`,
                  });
                }
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Create your student account</h1>
                <Error error={error} />
                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                  <p>
                    Your username <strong>will be visible to scientists</strong>
                    . Proceed with the name we suggest or choose your own (but
                    don't use your real name!).
                  </p>
                </label>
                {true && (
                  <label htmlFor="email">
                    <p>Email address</p>
                    <input
                      type="email"
                      name="email"
                      placeholder={
                        !this.state.info.useTeacherEmail && 'Enter your email'
                      }
                      value={this.state.email}
                      onChange={this.saveToState}
                      disabled={this.state.info.useTeacherEmail}
                      required={!this.state.info.useTeacherEmail}
                    />
                  </label>
                )}

                <div>
                  <label htmlFor="useTeacherEmail">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="useTeacherEmail"
                        name="useTeacherEmail"
                        value={this.state.info.useTeacherEmail}
                        onChange={() => {
                          this.setState({
                            info: {
                              ...this.state.info,
                              useTeacherEmail: !this.state.info.useTeacherEmail,
                            },
                          });
                        }}
                      />
                      <h2>Use the email address of the teacher</h2>
                    </div>
                  </label>
                </div>

                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.saveToState}
                    required
                  />
                </label>

                {!(this.props.user && this.props.user.zipCode) && (
                  <label htmlFor="zipcode">
                    <p>Zip code</p>
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="Enter your zip code"
                      value={this.state.info.zipcode}
                      onChange={this.saveToInfoState}
                    />
                  </label>
                )}

                {!(this.props.user && this.props.user.under18) && (
                  <label htmlFor="age">
                    <p>Age</p>
                    <input
                      type="text"
                      name="age"
                      placeholder="Enter your age"
                      value={this.state.info.age}
                      onChange={this.saveToInfoState}
                    />
                  </label>
                )}

                <div>
                  <label htmlFor="confirmUsername">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="confirmUsername"
                        name="confirmUsername"
                        value="checked"
                        required
                      />
                      <span>
                        I confirm that my user name does not contain any
                        personally identifiable information (first and last
                        name).
                      </span>
                    </div>
                  </label>
                </div>

                <button type="submit">Create account</button>
                <p>
                  By clicking on "Create account", you agree to MindHive's Terms
                  of Service, including our Privacy Policy.
                </p>
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default StudentSignup;