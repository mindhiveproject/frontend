import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  CURRENT_USER_QUERY,
  CURRENT_USER_RESULTS_QUERY,
  CURRENT_USER_STUDIES_QUERY,
  USER_DASHBOARD_QUERY,
} from '../User/index';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[
      { query: CURRENT_USER_QUERY },
      { query: CURRENT_USER_RESULTS_QUERY },
      { query: CURRENT_USER_STUDIES_QUERY },
      { query: USER_DASHBOARD_QUERY },
    ]}
  >
    {signout => <button onClick={signout}>Sign out</button>}
  </Mutation>
);

export default Signout;
