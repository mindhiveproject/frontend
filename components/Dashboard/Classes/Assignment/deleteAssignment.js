import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import { CLASS_ASSIGNMENTS } from '../../../Queries/Assignment';
import { DELETE_ASSIGNMENT_MUTATION } from '../../../Mutations/Assignment';

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
