import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { JOURNAL_POSTS } from '../journalpage';
import { MY_JOURNALS_QUERY } from '../journals';

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

class DeletePost extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_POST_MUTATION}
        variables={{ id: this.props.postId }}
        refetchQueries={[
          { query: JOURNAL_POSTS, variables: { id: this.props.journalId } },
          { query: MY_JOURNALS_QUERY },
        ]}
      >
        {(deletePost, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (confirm('Are you sure you want to delete this post?')) {
                deletePost().catch(err => {
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

export default DeletePost;
