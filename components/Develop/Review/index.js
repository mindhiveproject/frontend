import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';

import ReviewsContainer from './container';
import InDev from '../inDev';

import { PROPOSAL_REVIEWS_QUERY } from '../../Queries/Review';
import { StyledReviewPage } from './styles';

class ReviewSection extends Component {
  state = {
    proposalId:
      this.props.proposals && this.props.proposals?.length
        ? this.props.proposals[0].id
        : '',
  };

  onProposalChange = (event, data) => {
    this.setState({
      proposalId: data.value,
    });
  };

  render() {
    const { study, proposals } = this.props;

    if (!study?.id) {
      return (
        <InDev
          header="👀 No study found"
          message="Please save your new study first"
        />
      );
    }

    if (proposals.length === 0) {
      return (
        <InDev
          header="👀 There are no proposals"
          message="Please create a proposal"
        />
      );
    }

    return (
      <StyledReviewPage>
        <Query
          query={PROPOSAL_REVIEWS_QUERY}
          variables={{ id: this.state.proposalId }}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;

            if (!data?.proposalBoard)
              return (
                <InDev
                  header="No proposal found"
                  message={`Please contact MindHive administrator (missing proposal ID: ${this.state.proposalId}).`}
                />
              );
            const { proposalBoard } = data;

            return (
              <ReviewsContainer
                study={this.props.study}
                proposals={this.props.proposals}
                user={this.props.user}
                onProposalChange={this.onProposalChange}
                proposal={proposalBoard}
              />
            );
          }}
        </Query>
      </StyledReviewPage>
    );
  }
}

export default ReviewSection;
