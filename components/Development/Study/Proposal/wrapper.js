import React, { Component } from 'react';

import InDev from '../inDev';

import Overview from './overview';
import ProposalPage from './proposalpage';
import CreateProposal from './createProposal';

class ProposalWrapper extends Component {
  state = {
    page: 'overview', // overview, proposal, create
    proposal: null,
    isCopy: false,
    copyProposalId: null,
  };

  goToOverview = () => {
    this.setState({
      page: 'overview',
    });
  };

  openProposal = proposalId => {
    const [proposal] = this.props?.study?.proposal.filter(
      prop => prop.id === proposalId
    );
    this.setState({
      page: 'proposal',
      proposal,
    });
  };

  copyProposal = proposalId => {
    this.setState({
      isCopy: true,
      copyProposalId: proposalId,
      page: 'create',
    });
  };

  createProposal = () => {
    this.setState({
      isCopy: false,
      page: 'create',
    });
  };

  render() {
    const { study } = this.props;
    if (!study?.id) {
      return (
        <InDev
          header="No study found"
          message="Please save your new study first."
        />
      );
    }

    const templates = this.props.templates.map(template => ({
      key: template.id,
      text: template.title,
      value: template.id,
    }));

    if (this.state.page === 'proposal') {
      return (
        <ProposalPage
          proposal={this.state.proposal}
          {...this.props}
          goToOverview={this.goToOverview}
        />
      );
    }
    if (this.state.page === 'create') {
      return (
        <CreateProposal
          templates={templates}
          study={this.props?.study}
          goToOverview={this.goToOverview}
          isCopy={this.state.isCopy}
          copyProposalId={this.state.copyProposalId}
        />
      );
    }
    return (
      <Overview
        study={this.props?.study}
        openProposal={this.openProposal}
        copyProposal={this.copyProposal}
        createProposal={this.createProposal}
      />
    );
  }
}

export default ProposalWrapper;
