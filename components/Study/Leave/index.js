import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import {
  CURRENT_USER_QUERY,
  CURRENT_USER_RESULTS_QUERY,
  CURRENT_USER_STUDIES_QUERY,
  USER_DASHBOARD_QUERY,
} from '../../Queries/User';

const LEAVE_STUDY_MUTATION = gql`
  mutation LEAVE_STUDY_MUTATION($id: ID!) {
    leaveStudy(id: $id) {
      message
    }
  }
`;

const LeaveStudy = props => {
  const leave = leaveStudy => {
    if (confirm('Are you sure you want to leave the study?')) {
      leaveStudy();
    }
  };

  return (
    <Mutation
      mutation={LEAVE_STUDY_MUTATION}
      refetchQueries={[
        { query: CURRENT_USER_QUERY },
        { query: CURRENT_USER_RESULTS_QUERY },
        { query: CURRENT_USER_STUDIES_QUERY },
        { query: USER_DASHBOARD_QUERY },
      ]}
      variables={{ id: props.id }}
    >
      {leaveStudy => (
        <button
          onClick={() => {
            leave(leaveStudy);
          }}
        >
          Leave
        </button>
      )}
    </Mutation>
  );
};

export default LeaveStudy;
