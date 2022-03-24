import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../../ErrorMessage/index';
import InDev from '../inDev';

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
      <Query query={PROPOSAL_TEMPLATES_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data?.proposalBoards)
            return (
              <InDev
                header="🔥 Error with proposal templates"
                message="Please contact the tech support at info@mindhive.science"
              />
            );
          const { proposalBoards } = data;
          return <ProposalWrapper templates={proposalBoards} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default ProposalSection;
