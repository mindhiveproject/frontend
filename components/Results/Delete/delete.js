import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

const DELETE_RESULT_MUTATION = gql`
  mutation DELETE_RESULT_MUTATION($id: ID!) {
    deleteResult(id: $id) {
      id
    }
  }
`;

class DeleteResult extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_RESULT_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        refetchQueries={this.props.refetchQueries}
      >
        {(deleteResult, { error }) => (
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to delete this result?')) {
                deleteResult().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteResult;
