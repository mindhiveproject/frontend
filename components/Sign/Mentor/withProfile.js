import React, { Component } from 'react';
import Router from 'next/router';
import { Query, Mutation } from '@apollo/client/react/components';
import {
  CURRENT_USER_EMAIL_QUERY,
  CURRENT_USER_RESULTS_QUERY,
} from '../../Queries/User';

import { JOIN_CLASS_AS_MENTOR_MUTATION } from '../../Mutations/Class';

class WithProfile extends Component {
  state = {
    id: this.props.id,
    email: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  joinClass = async (joinClassMutation, email) => {
    if (!email) {
      alert('Enter your email address to proceed');
      return;
    }
    const res = await joinClassMutation();
    this.setState({ email: '' });
    Router.push({
      pathname: `/dashboard`,
    });
  };

  render() {
    return (
      <Query query={CURRENT_USER_EMAIL_QUERY}>
        {({ data, loading }) => {
          if (loading) return null;

          if (data?.me) {
            const { me } = data;
            const [authEmail] = me.authEmail;
            const email = authEmail?.email;
            return (
              <>
                <Mutation
                  mutation={JOIN_CLASS_AS_MENTOR_MUTATION}
                  variables={this.state}
                  refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
                >
                  {(classJoin, { error, loading }) => (
                    <>
                      {!email && (
                        <label htmlFor="email">
                          <p>Email address</p>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={this.state.email}
                            onChange={this.saveToState}
                            required
                          />
                        </label>
                      )}
                      <button
                        type="submit"
                        onClick={() =>
                          this.joinClass(classJoin, email || this.state.email)
                        }
                      >
                        Join class as a mentor
                      </button>
                    </>
                  )}
                </Mutation>
              </>
            );
          }
        }}
      </Query>
    );
  }
}

export default WithProfile;
