import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { Icon } from 'semantic-ui-react';

import { MY_JOURNALS_QUERY, JOURNAL_POSTS } from '../../../Queries/Journal';
import { DELETE_POST_MUTATION } from '../../../Mutations/Journal';

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
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => {
              if (confirm('Are you sure you want to delete this post?')) {
                deletePost().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            <Icon name="trash" />
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeletePost;
