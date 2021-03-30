import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import ProposalTemplate from './template';

// query to get all public templates (proposal boards with isTemplate is true)
const PROPOSAL_TEMPLATES_QUERY = gql`
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
              <ProposalTemplate templates={proposalBoards} {...this.props} />
            );
          }}
        </Query>
      </>
    );
  }
}

export default ProposalSection;
