import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { CLASS_ASSIGNMENTS } from './wrapper';

const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation DELETE_ASSIGNMENT_MUTATION($id: ID!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`;

class DeleteAssignment extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_ASSIGNMENT_MUTATION}
        variables={{ id: this.props.assignmentId }}
        refetchQueries={[
          {
            query: CLASS_ASSIGNMENTS,
            variables: { id: this.props.classId },
          },
        ]}
      >
        {(deleteAssignment, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (confirm('Are you sure you want to delete this assignment?')) {
                deleteAssignment().catch(err => {
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

export default DeleteAssignment;
