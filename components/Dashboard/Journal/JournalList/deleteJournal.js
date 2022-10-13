import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import { Icon } from 'semantic-ui-react';

import { DELETE_JOURNAL_MUTATION } from '../../../Mutations/Journal';
import { MY_JOURNALS_QUERY } from '../../../Queries/Journal';

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
            <Icon name="trash" />
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteJournal;
