import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import InDev from '../inDev';

import ProposalWrapper from './wrapper';

import { StyledProposal } from './styles';

// query to get all public templates (proposal boards with isTemplate is true)
import { PROPOSAL_TEMPLATES_QUERY } from '../../Queries/Proposal';

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
                header="🤷🏻 Sorry, there are no proposal templates"
                message="If you need help, please contact the tech support at info@mindhive.science"
              />
            );
          const { proposalBoards } = data;
          return (
            <StyledProposal>
              <ProposalWrapper templates={proposalBoards} {...this.props} />;
            </StyledProposal>
          );
        }}
      </Query>
    );
  }
}

export default ProposalSection;
