import React, { Component } from "react";

import gql from "graphql-tag";
import { Mutation } from "@apollo/client/react/components";
import { Checkbox } from "semantic-ui-react";
import { PARTICIPANT_RESULTS_QUERY } from "./results";

const CHANGE_RESULT_STATUS_MUTATION = gql`
  mutation CHANGE_RESULT_STATUS_MUTATION($id: ID!, $status: ResultType!) {
    changeResultStatus(id: $id, status: $status) {
      message
    }
  }
`;

class ChangeOneResultStatus extends Component {
  render() {
    const { id, isIncluded, participantId, studyId } = this.props;
    const newStatus = isIncluded ? "TEST" : "MAIN";

    return (
      <Mutation
        mutation={CHANGE_RESULT_STATUS_MUTATION}
        variables={{ ...this.props, status: newStatus }}
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
          <div
            onClick={() => {
              changeStatus();
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

export default ChangeOneResultStatus;
