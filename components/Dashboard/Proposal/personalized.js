import React, { Component } from "react";

import Proposals from "./proposals";
import ProposalPage from "./proposalpage";
import AddProposal from "./addproposal";

import AuthorizedPage from "../../Page/userpage";

class DashboardProposal extends Component {
  state = {
    page: this.props.page || "proposals",
    proposal: null,
  };

  addProposal = () => {
    this.setState({
      page: "addproposal",
    });
  };

  openProposal = (proposal) => {
    this.setState({
      page: "proposalpage",
      proposal,
    });
  };

  goBack = () => {
    this.setState({
      page: "proposals",
      proposal: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === "proposals") {
      return (
        <AuthorizedPage>
          <Proposals
            user={this.props.user}
            addProposal={this.addProposal}
            openProposal={this.openProposal}
            adminMode={this.props.adminMode}
          />
        </AuthorizedPage>
      );
    }

    if (page === "proposalpage") {
      return (
        <AuthorizedPage>
          <ProposalPage
            user={this.props.user}
            proposal={this.state.proposal}
            goBack={this.goBack}
            proposalBuildMode
          />
        </AuthorizedPage>
      );
    }

    if (page === "addproposal") {
      return <AddProposal user={this.props.user} goBack={this.goBack} />;
    }
  }
}

export default DashboardProposal;
