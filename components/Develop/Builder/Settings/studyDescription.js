import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

import ProposalCardSelector from './proposalCardSelector';

class StudyDescription extends Component {
  state = {
    proposalId:
      this.props?.descriptionInProposalCard?.section?.board?.id || null,
  };

  onSelect = data => {
    this.setState({
      proposalId: data.value,
    });
  };

  render() {
    const { proposalId } = this.state;
    const proposals = this.props?.study?.proposal || [];

    const proposalDropdownOptions = proposals.map(proposal => ({
      key: proposal.id,
      text: proposal.title,
      value: proposal.id,
    }));

    return (
      <div className="studyDescription">
        <h2>Study description</h2>
        <p>
          This is for internal use only. Participants won’t see this
          description.
        </p>
        <div className="selector">
          <p>Select a source</p>
          <Dropdown
            placeholder="Link to proposal"
            fluid
            selection
            options={proposalDropdownOptions}
            onChange={(event, data) => this.onSelect(data)}
            value={proposalId}
          />
        </div>

        {proposalId && (
          <ProposalCardSelector {...this.props} proposalId={proposalId} />
        )}
      </div>
    );
  }
}

export default StudyDescription;
