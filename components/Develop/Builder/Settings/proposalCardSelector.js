import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Query } from '@apollo/client/react/components';
import Error from '../../../ErrorMessage/index';

import { GET_CARD_TITLES_OF_PROPOSAL_QUERY_BY_ID } from '../../../Queries/Proposal';

class ProposalCardSelector extends Component {
  state = {
    cardId: this.props?.descriptionInProposalCard?.id || null,
  };

  onSelect = data => {
    this.setState({
      cardId: data.value,
    });
    this.props.updateStudyState('descriptionInProposalCardId', data.value);
  };

  render() {
    return (
      <Query
        query={GET_CARD_TITLES_OF_PROPOSAL_QUERY_BY_ID}
        variables={{ id: this.props.proposalId }}
      >
        {proposalPayload => {
          const proposalPayloadError = proposalPayload.error;
          const proposalPayloadLoading = proposalPayload.loading;
          const proposalPayloadData =
            proposalPayload.data && proposalPayload.data.proposalBoard;
          if (proposalPayloadError)
            return <Error error={proposalPayloadError} />;
          if (proposalPayloadLoading) return <p>Loading</p>;
          if (!proposalPayloadData)
            return (
              <div>
                <p>No proposal found</p>
              </div>
            );

          // get the titles of all cards in the proposal

          const { sections } = proposalPayloadData;
          const orderedSections = [...sections].sort(
            (a, b) => a.position - b.position
          );

          const titleOptions = orderedSections
            .map(section =>
              // order cards inside each section
              [...section.cards].sort((a, b) => a.position - b.position)
            )
            .flat()
            .map(card => ({
              key: card.id,
              text: card.title,
              value: card.id,
            }));

          return (
            <div className="selector">
              <p>Select card</p>
              <Dropdown
                placeholder="Link to proposal"
                fluid
                selection
                options={titleOptions}
                onChange={(event, data) => this.onSelect(data)}
                value={this.state.cardId}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProposalCardSelector;
