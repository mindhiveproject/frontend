import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import ProposalWrapper from './proposalWrapper';

// import a proposal query here
import { PROPOSAL_BOARD_QUERY } from '../../../Dashboard/Proposal/proposalpage';

// const FULL_PROPOSAL_QUERY = gql`
//   query FULL_PROPOSAL_QUERY($id: ID!) {
//     proposalBoard(where: { id: $id }) {
//       id
//       title
//       slug
//       description
//       sections {
//         id
//         title
//         description
//         position
//         cards {
//           id
//           title
//           content
//           position
//           section {
//             id
//           }
//         }
//       }
//     }
//   }
// `;

class ReviewSection extends Component {
  render() {
    const { study } = this.props;
    const [proposal] = study.proposal;
    return (
      <Query query={PROPOSAL_BOARD_QUERY} variables={{ id: proposal.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data?.proposalBoard)
            return <p>No proposal found for {proposalId}</p>;
          const proposal = data.proposalBoard;
          return (
            <ProposalWrapper
              proposal={proposal}
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
