import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { STUDY_DEVELOPMENT_QUERY } from '../../Queries/Study';

const DELETE_PROPOSAL_MUTATION = gql`
  mutation DELETE_PROPOSAL_MUTATION($id: ID!) {
    deleteProposalBoard(id: $id) {
      message
    }
  }
`;

class DeleteProposal extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_PROPOSAL_MUTATION}
        variables={{ id: this.props.proposalId }}
        refetchQueries={[
          {
            query: STUDY_DEVELOPMENT_QUERY,
            variables: {
              id: this.props.studyId,
            },
          },
        ]}
      >
        {(deleteProposalBoard, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this proposal? All sections and cards in this proposal will be deleted as well.'
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
