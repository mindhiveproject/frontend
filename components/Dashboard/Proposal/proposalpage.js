import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import Head from "next/head";
import Error from "../../ErrorMessage/index";

import ProposalContainer from "./Board/index";

import { StyledDasboard, StyledDevelopDasboard } from "../styles";

import { PROPOSAL_BOARD_QUERY_LIGHT } from "../../Queries/Proposal";

class ProposalPage extends Component {
  state = {};

  render() {
    const proposalId = this.props.proposal.id;

    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <Query
            query={PROPOSAL_BOARD_QUERY_LIGHT}
            variables={{ id: proposalId }}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data?.proposalBoard)
                return <p>No proposal found for {proposalId}</p>;
              const proposal = data.proposalBoard;

              return (
                <div>
                  <Head>
                    <title>mindHIVE | {proposal.title}</title>
                  </Head>
                  <ProposalContainer
                    user={this.props.user}
                    proposal={proposal}
                    onClose={this.props.goBack}
                    proposalBuildMode={this.props.proposalBuildMode}
                  />
                </div>
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default ProposalPage;
