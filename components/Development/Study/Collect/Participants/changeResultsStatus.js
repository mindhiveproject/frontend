import React, { Component } from "react";

import gql from "graphql-tag";
import { Mutation } from "@apollo/client/react/components";

import { Checkbox } from "semantic-ui-react";
import { PARTICIPANT_STUDY_RESULTS_QUERY } from "../../../../Queries/Result";

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

const CHANGE_GUEST_STATUS_OF_DATA_MUTATION = gql`
  mutation CHANGE_GUEST_STATUS_OF_DATA_MUTATION(
    $participantId: ID!
    $studyId: ID!
    $status: ResultType!
  ) {
    changeStatusGuestParticipantStudyResults(
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
    const { type, participantId, studyId, isIncluded } = this.props;
    const newStatus = isIncluded ? "TEST" : "MAIN";

    return (
      <Mutation
        mutation={
          type === "Guest"
            ? CHANGE_GUEST_STATUS_OF_DATA_MUTATION
            : CHANGE_STATUS_OF_DATA_MUTATION
        }
        variables={{ ...this.props, status: newStatus }}
        refetchQueries={[
          {
            query: PARTICIPANT_STUDY_RESULTS_QUERY,
            variables: {
              participantId,
              studyId,
            },
          },
        ]}
      >
        {(changeStatus, { loading, error }) => (
          <div
            onClick={() => {
              if (!loading) changeStatus();
            }}
          >
            {loading ? (
              <p>Wait ...</p>
            ) : (
              <a>
                <Checkbox toggle checked={isIncluded} />
              </a>
            )}
          </div>
        )}
      </Mutation>
    );
  }
}

export default ChangeResultsStatus;
