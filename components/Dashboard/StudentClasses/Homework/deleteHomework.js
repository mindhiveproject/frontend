import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { MY_ASSIGNMENT_HOMEWORKS } from '../Assignment/assignmentTab';

const DELETE_HOMEWORK_MUTATION = gql`
  mutation DELETE_HOMEWORK_MUTATION($id: ID!) {
    deleteHomework(id: $id) {
      id
    }
  }
`;

class DeleteHomework extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_HOMEWORK_MUTATION}
        variables={{ id: this.props.homeworkId }}
        refetchQueries={[
          {
            query: MY_ASSIGNMENT_HOMEWORKS,
            variables: { id: this.props.assignmentId },
          },
        ]}
      >
        {(deleteHomework, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (confirm('Are you sure you want to delete this homework?')) {
                deleteHomework().catch(err => {
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

export default DeleteHomework;
