import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import {
  CURRENT_USER_QUERY,
  CURRENT_USER_RESULTS_QUERY,
  CURRENT_USER_STUDIES_QUERY,
  USER_DASHBOARD_QUERY,
} from '../Queries/User';
import { MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY } from '../Queries/Component';

import { MY_DEVELOPED_STUDIES_QUERY } from '../Bank/Studies/developed';

import { SignoutButton } from '../Nav/styles';

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
      {
        query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
        variables: { taskType: 'TASK' },
      },
      {
        query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
        variables: { taskType: 'SURVEY' },
      },
      {
        query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
        variables: { taskType: 'BLOCK' },
      },
    ]}
  >
    {signout => (
      <SignoutButton
        onClick={() => {
          Router.push({
            pathname: `/`,
          });
          signout();
        }}
      >
        Log off
      </SignoutButton>
    )}
  </Mutation>
);

export default Signout;
