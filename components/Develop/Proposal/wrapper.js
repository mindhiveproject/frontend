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
    const [proposal] = this.props?.proposals.filter(
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
          header="👀 No study found"
          message="Please save your new study and reload the page"
        />
      );
    }

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
          templates={this.props.templates}
          study={this.props?.study}
          goToOverview={this.goToOverview}
          isCopy={this.state.isCopy}
          copyProposalId={this.state.copyProposalId}
          copyProposal={this.state.proposal}
        />
      );
    }
    return (
      <Overview
        study={this.props?.study}
        proposals={this.props?.proposals}
        openProposal={this.openProposal}
        copyProposal={this.copyProposal}
        createProposal={this.createProposal}
      />
    );
  }
}

export default ProposalWrapper;
