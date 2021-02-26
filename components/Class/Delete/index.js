import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { MY_CLASSES_QUERY } from '../Board/my';
import { ALL_CLASSES_QUERY } from '../Board/all';

const DELETE_CLASS_MUTATION = gql`
  mutation DELETE_CLASS_MUTATION($id: ID!) {
    deleteClass(id: $id) {
      id
    }
  }
`;

class DeleteClass extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_CLASS_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[
          { query: MY_CLASSES_QUERY },
          { query: ALL_CLASSES_QUERY },
        ]}
      >
        {(deleteClass, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this class?')) {
                deleteClass().catch(err => {
                  alert(err.message);
                });
                // redirect back
                if (this.props.redirect) {
                  this.props.redirectFunction();
                }
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

export default DeleteClass;
