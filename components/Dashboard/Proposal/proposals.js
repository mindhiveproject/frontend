import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import styled from "styled-components";
import ProposalRow from "./ProposalList/index";
import { StyledDasboard, StyledClassesDasboard } from "../styles";

import {
  MY_PROPOSALS_QUERY,
  ALL_PROPOSALS_QUERY,
} from "../../Queries/Proposal";

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledProposalHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  cursor: pointer;
  font-weight: bold;
`;

class Proposals extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>
            {this.props.adminMode ? `All proposals` : `My proposal templates`}
          </h1>

          <Query
            query={
              this.props.adminMode ? ALL_PROPOSALS_QUERY : MY_PROPOSALS_QUERY
            }
            variables={{ creatorId: this.props.user?.id }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { proposalBoards } = data;
              if (proposalBoards.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any proposal templates yet.</h3>
                    <p>
                      Once you create a proposal template, it will appear here.
                    </p>
                    <div className="navigationHeader">
                      <div></div>
                      <div>
                        <button onClick={this.props.addProposal}>
                          Create Proposal Board
                        </button>
                      </div>
                    </div>
                    <div>
                      <p>
                        Use the proposal builder to create proposal templates.
                      </p>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div></div>
                    <div>
                      <button onClick={this.props.addProposal}>
                        Create Proposal Template
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>
                        Use the proposal builder to create proposal templates.
                      </p>
                    </div>
                  </div>
                  <div>
                    <StyledRow>
                      <StyledProposalHeader>
                        <div>Template</div>
                        <div>Study</div>
                        <div>Author</div>
                        <div>Sections</div>
                        <div>Date created</div>
                        <div>Template</div>
                      </StyledProposalHeader>
                      <div></div>
                    </StyledRow>

                    {proposalBoards.map((myproposal) => (
                      <ProposalRow
                        user={this.props.user}
                        myproposal={myproposal}
                        key={myproposal.id}
                        openProposal={this.props.openProposal}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default Proposals;
