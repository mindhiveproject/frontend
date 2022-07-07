import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';

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
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
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
            <h2>{this.props.children}</h2>
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteResult;
