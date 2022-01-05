import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { PUBLIC_ASSIGNMENTS_QUERY } from '../assignments';

const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation DELETE_ASSIGNMENT_MUTATION($id: ID!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`;

class DeleteProposal extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_ASSIGNMENT_MUTATION}
        variables={{ id: this.props.assignmentId }}
        refetchQueries={[{ query: PUBLIC_ASSIGNMENTS_QUERY }]}
      >
        {(deleteProposalBoard, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this assignment template?'
                )
              ) {
                deleteProposalBoard().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteProposal;
