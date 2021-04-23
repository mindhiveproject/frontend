import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import ProposalWrapper from './proposalWrapper';
import { PROPOSAL_BOARD_QUERY } from '../../../Dashboard/Proposal/proposalpage';

import InDev from '../inDev';

class ReviewSection extends Component {
  render() {
    const { study } = this.props;

    if (study?.proposal.length === 0) {
      return (
        <InDev
          header="No proposal found"
          message="Please create a new proposal first."
        />
      );
    }
    const [proposal] = study.proposal;
    const proposalId = proposal?.id;

    return (
      <Query query={PROPOSAL_BOARD_QUERY} variables={{ id: proposalId }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;

          if (!data?.proposalBoard)
            return (
              <InDev
                header="No proposal found"
                message={`Please contact MindHive administrator (missing proposal ID: ${proposalId}).`}
              />
            );
          const { proposalBoard } = data;

          return (
            <ProposalWrapper
              proposal={proposalBoard}
              study={study}
              user={this.props.user}
            />
          );
        }}
      </Query>
    );
  }
}

export default ReviewSection;
