import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/client/react/components';
import { PARTICIPANT_RESULTS_QUERY } from './results';

const CHANGE_RESULT_STATUS_MUTATION = gql`
  mutation CHANGE_RESULT_STATUS_MUTATION($id: ID!, $status: ResultType!) {
    changeResultStatus(id: $id, status: $status) {
      message
    }
  }
`;

class ChangeOneResultStatus extends Component {
  render() {
    const { id, status, participantId, studyId } = this.props;

    return (
      <Mutation
        mutation={CHANGE_RESULT_STATUS_MUTATION}
        variables={this.props}
        refetchQueries={[
          {
            query: PARTICIPANT_RESULTS_QUERY,
            variables: {
              participantId,
              studyId,
            },
          },
        ]}
      >
        {(changeStatus, { loading, error }) => (
          <p
            onClick={() => {
              changeStatus();
            }}
          >
            <a>
              {status === 'TEST' ? 'Exclud' : 'Includ'}
              {loading ? 'ing' : 'e'} {status === 'TEST' ? 'from' : 'in'}{' '}
              analysis
            </a>
          </p>
        )}
      </Mutation>
    );
  }
}

export default ChangeOneResultStatus;
