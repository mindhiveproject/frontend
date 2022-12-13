import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import Router from 'next/router';
import { SignupForm, CreateAccountForm } from '../styles';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';

import { SIGNUP_MUTATION } from '../../Mutations/User';

class MentorEmailSignup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    user: this.props.user,
    study: this.props.study,
    class: this.props.class,
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
        mutation={SIGNUP_MUTATION}
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
                  variables: { permissions: ['MENTOR'] },
                });
                this.setState({ username: '', password: '', email: '' });
                if (this.props.redirect) {
                  Router.push(
                    '/studies/[slug]',
                    `/studies/${this.props.redirect}`
                  );
                } else {
                  Router.push({
                    pathname: `/dashboard`,
                  });
                }
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Create your account</h1>
                <Error error={error} />
                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                  <div className="helpText"></div>
                </label>

                <label htmlFor="email">
                  <p>Email address</p>
                  <input
                    type="email"
                    name="email"
                    placeholder={
                      !this.state?.info?.useTeacherEmail && 'Enter your email'
                    }
                    value={this.state.email}
                    onChange={this.saveToState}
                    disabled={this.state?.info?.useTeacherEmail}
                    required={!this.state?.info?.useTeacherEmail}
                  />
                </label>

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

                <button type="submit">Create account</button>
                <p>
                  By clicking on “Create account” you agree to MindHive’s{' '}
                  <a
                    target="_blank"
                    href="https://mindhive.science/docs/terms"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>
                  , including our{' '}
                  <a
                    target="_blank"
                    href="https://mindhive.science/docs/privacy"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default MentorEmailSignup;
