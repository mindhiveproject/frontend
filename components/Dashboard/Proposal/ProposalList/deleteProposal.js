import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import { MY_PROPOSALS_QUERY } from '../../../Queries/Proposal';
import { DELETE_PROPOSAL } from '../../../Mutations/Proposal';

class DeleteProposal extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_PROPOSAL}
        variables={{ id: this.props.proposalId }}
        refetchQueries={[{ query: MY_PROPOSALS_QUERY }]}
      >
        {(deleteProposalBoard, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this proposal template? All sections and cards in this proposal will be deleted as well.'
                )
              ) {
                deleteProposalBoard().catch(err => {
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
