import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/client/react/components';

import { PARTICIPANT_STUDY_RESULTS_QUERY } from './row';
import { MY_STUDY_RESULTS_QUERY } from '../../../../DataViz/index';

const CHANGE_STATUS_OF_DATA_MUTATION = gql`
  mutation CHANGE_STATUS_OF_DATA_MUTATION(
    $participantId: ID!
    $studyId: ID!
    $status: ResultType!
  ) {
    changeStatusParticipantStudyResults(
      participantId: $participantId
      studyId: $studyId
      status: $status
    ) {
      message
    }
  }
`;

class ChangeResultsStatus extends Component {
  render() {
    const { participantId, studyId, status } = this.props;

    return (
      <Mutation
        mutation={CHANGE_STATUS_OF_DATA_MUTATION}
        variables={this.props}
        refetchQueries={[
          {
            query: PARTICIPANT_STUDY_RESULTS_QUERY,
            variables: {
              participantId,
              studyId,
            },
          },
          {
            query: MY_STUDY_RESULTS_QUERY,
            variables: {
              id: studyId,
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
              Mark{loading ? 'ing' : ''} as{' '}
              {status === 'TEST' ? 'test' : 'real'} data
            </a>
          </p>
        )}
      </Mutation>
    );
  }
}

export default ChangeResultsStatus;
