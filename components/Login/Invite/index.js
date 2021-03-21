import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ALL_CLASSES_QUERY } from '../../Class/Board/all';

const INVITE_LOGIN_MUTATION = gql`
  mutation INVITE_LOGIN_MUTATION($username: String!, $invitedIn: ID!) {
    inviteLogin(username: $username, invitedIn: $invitedIn) {
      id
      username
      permissions
    }
  }
`;

class InviteLogin extends Component {
  state = {
    username: '',
    invitedIn: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Query query={ALL_CLASSES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { classes } = data;
          return (
            <>
              <Mutation
                mutation={INVITE_LOGIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
              >
                {(tokenLogin, { error, loading }) => (
                  <SignForm
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await tokenLogin();
                      console.log('res', res);
                      this.setState({ token: '' });
                      Router.push({
                        pathname: '/dashboard',
                      });
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h3>
                        Have you already done onboarding? Then just log in with
                        your username.
                      </h3>
                      <Error error={error} />
                      <label htmlFor="invitedIn">
                        Class
                        <select
                          type="text"
                          name="invitedIn"
                          placeholder="invitedIn"
                          value={this.state.invitedIn}
                          onChange={this.saveToState}
                          required
                        >
                          <option value=""> --- Choose your class --- </option>
                          {classes.map(schoolclass => (
                            <option value={schoolclass.id} key={schoolclass.id}>
                              {schoolclass.title}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label htmlFor="username">
                        Username
                        <input
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.saveToState}
                        />
                      </label>
                      <button type="submit">Login</button>
                    </fieldset>
                  </SignForm>
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default InviteLogin;
