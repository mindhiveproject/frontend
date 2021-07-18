import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { Dropdown } from 'semantic-ui-react';
import Error from '../../../ErrorMessage/index';

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
  state = {
    proposalId:
      this.props.study.proposal && this.props.study?.proposal?.length
        ? this.props.study?.proposal[0].id
        : '',
  };

  onProposalChange = (event, data) => {
    this.setState({
      proposalId: data.value,
    });
  };

  render() {
    const { study } = this.props;

    if (!study?.proposal || study?.proposal?.length === 0) {
      return (
        <InDev
          header="No proposal found"
          message="Please create a new proposal first."
        />
      );
    }

    return (
      <div>
        <Dropdown
          placeholder="Select proposal"
          fluid
          selection
          options={this.props.study.proposal.map(p => ({
            key: p.id,
            value: p.id,
            text: p.title,
          }))}
          onChange={this.onProposalChange}
          value={this.state.proposalId}
        />
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
                proposal={proposalBoard}
                study={study}
                user={this.props.user}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ReviewSection;
