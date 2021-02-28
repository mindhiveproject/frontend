import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { MY_JOURNALS_QUERY } from '../journals';

const DELETE_JOURNAL_MUTATION = gql`
  mutation DELETE_JOURNAL_MUTATION($id: ID!) {
    deleteJournal(id: $id) {
      id
    }
  }
`;

class DeleteJournal extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_JOURNAL_MUTATION}
        variables={{ id: this.props.journalId }}
        refetchQueries={[{ query: MY_JOURNALS_QUERY }]}
      >
        {(deleteJournal, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this journal? All notes in this journal will be deleted as well.'
                )
              ) {
                deleteJournal().catch(err => {
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

export default DeleteJournal;
