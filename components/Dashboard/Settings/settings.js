import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import Error from '../../ErrorMessage/index';

import { CreateAccountForm } from '../../Sign/styles';

import { CURRENT_USER_EMAIL_QUERY } from '../../User/index';

const StyledSettingsDasboard = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1rem;
`;

const EDIT_ACCOUNT_MUTATION = gql`
  mutation EDIT_ACCOUNT_MUTATION(
    $username: String
    $email: String
    $password: String
    $info: Json
  ) {
    editAccount(
      username: $username
      email: $email
      password: $password
      info: $info
    ) {
      id
    }
  }
`;

class HomeDashboard extends Component {
  state = {
    username: this.props?.me?.username,
    email:
      (this.props?.me?.authEmail &&
        this.props?.me?.authEmail.length &&
        this.props?.me?.authEmail[0]?.email) ||
      '',
    info: { ...this.props?.me?.generalInfo },
    password: '',
    passwordRepeat: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleState = e => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: !this.state.info[e.target.name],
      },
    });
  };

  render() {
    const { username, email, info, password, passwordRepeat } = this.state;
    return (
      <Mutation
        mutation={EDIT_ACCOUNT_MUTATION}
        variables={{
          username: this.state.username,
          info: this.state.info,
          email: this.state.email,
        }}
        refetchQueries={[{ query: CURRENT_USER_EMAIL_QUERY }]}
      >
        {(editAccount, { error, loading }) => (
          <StyledSettingsDasboard>
            <CreateAccountForm
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const newVariables = {};
                if (password !== '') {
                  if (password !== passwordRepeat) {
                    return alert('Passwords do not match');
                  }
                  newVariables.password = password;
                }
                await editAccount({
                  variables: {
                    ...newVariables,
                  },
                });
                this.setState({ password: '', passwordRepeat: '' });
                alert('The account information was updated');
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Edit account information</h1>
                <Error error={error} />

                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={this.saveToState}
                  />
                  {false && (
                    <div className="helpText">
                      Proceed with the name we suggest or choose your own.
                    </div>
                  )}
                </label>
                <label htmlFor="email">
                  <p>Email address</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={this.saveToState}
                    required
                  />
                </label>
                <label htmlFor="password">
                  <p>New password</p>
                  <input
                    // type="password"
                    name="password"
                    value={password}
                    onChange={this.saveToState}
                  />
                </label>

                <label htmlFor="password">
                  <p>Retype password to confirm</p>
                  <input
                    // type="password"
                    name="passwordRepeat"
                    value={passwordRepeat}
                    onChange={this.saveToState}
                  />
                </label>

                <div>
                  <label htmlFor="updates">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="updates"
                        name="updates"
                        checked={info.updates}
                        onChange={this.toggleState}
                      />
                      <span>
                        I agree to receive notifications and updates related to
                        the studies I follow. If you uncheck this box, you will
                        be asked to decide on a case-by-case basis.
                      </span>
                    </div>
                  </label>
                </div>

                <button type="submit">Update account</button>
              </fieldset>
            </CreateAccountForm>
          </StyledSettingsDasboard>
        )}
      </Mutation>
    );
  }
}

export default HomeDashboard;