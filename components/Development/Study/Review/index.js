import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import ReviewsContainer from './container';

import InDev from '../inDev';

export const PROPOSAL_REVIEWS_QUERY = gql`
  query PROPOSAL_REVIEWS_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      isSubmitted
      checklist
      reviews {
        id
        stage
        content
        author {
          id
        }
      }
    }
  }
`;

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
      <Query query={PROPOSAL_REVIEWS_QUERY} variables={{ id: proposalId }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          // console.log('data', data);

          if (!data?.proposalBoard)
            return (
              <InDev
                header="No proposal found"
                message={`Please contact MindHive administrator (missing proposal ID: ${proposalId}).`}
              />
            );
          const { proposalBoard } = data;

          return (
            <ReviewsContainer
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
