import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { TAGS_QUERY } from '../../../../Queries/Tag';

const DELETE_TAG_MUTATION = gql`
  mutation DELETE_TAG_MUTATION($id: ID!) {
    deleteTag(id: $id) {
      message
    }
  }
`;

class DeleteProposal extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_TAG_MUTATION}
        variables={{ id: this.props.tagId }}
        refetchQueries={[{ query: TAGS_QUERY }]}
      >
        {(deleteTheTag, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (confirm('Are you sure you want to delete this tag?')) {
                deleteTheTag().catch(err => {
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
