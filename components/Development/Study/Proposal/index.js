import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../../ErrorMessage/index';

import ProposalWrapper from './wrapper';

// query to get all public templates (proposal boards with isTemplate is true)
export const PROPOSAL_TEMPLATES_QUERY = gql`
  query PROPOSAL_TEMPLATES_QUERY {
    proposalBoards(where: { isTemplate: true }) {
      id
      title
    }
  }
`;

class ProposalSection extends Component {
  render() {
    return (
      <>
        <Query query={PROPOSAL_TEMPLATES_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data?.proposalBoards) return <p>No proposals found</p>;
            const { proposalBoards } = data;
            return (
              <ProposalWrapper templates={proposalBoards} {...this.props} />
            );
          }}
        </Query>
      </>
    );
  }
}

export default ProposalSection;
