import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import Head from "next/head";
import { Radio, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Error from "../../../ErrorMessage/index";

import ProposalContainer from "../../../Dashboard/Proposal/Board/index";
import ProposalPDF from "../../../Proposal/pdf";

import {
  StyledDasboard,
  StyledDevelopDasboard,
} from "../../../Dashboard/styles";

const StyledProposalBoard = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledPreviewToggle = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-gap: 1rem;
  margin: 1rem 0rem;
  align-items: center;
  span {
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
  }
  .goBackButton {
    cursor: pointer;
  }
  .preview {
    display: grid;
    grid-template-columns: auto auto;
  }
  .alert {
    background: #fff9e6;
    padding: 5px 10px 5px 10px;
    margin-left: 5px;
    border-radius: 4px;
    span,
    .icon {
      font-weight: 400;
      font-size: 13px;
      color: #666666;
    }
  }
`;

const PROPOSAL_BOARD_QUERY = gql`
  query PROPOSAL_BOARD_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          settings
          position
          section {
            id
          }
        }
      }
      study {
        id
        title
        slug
        author {
          id
          username
        }
        collaborators {
          id
          username
          username
        }
      }
      isSubmitted
      checklist
    }
  }
`;

class ProposalPage extends Component {
  state = {
    isPDF: false,
  };

  render() {
    const proposalId = this.props.proposal.id;

    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <Query query={PROPOSAL_BOARD_QUERY} variables={{ id: proposalId }}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data?.proposalBoard) return <></>;
              const proposal = data?.proposalBoard;

              return (
                <StyledProposalBoard>
                  <StyledPreviewToggle>
                    <div
                      className="goBackButton"
                      onClick={this.props.goToOverview}
                    >
                      <p>← Go back</p>
                    </div>
                    {proposal?.isSubmitted ? (
                      <div>
                        <h3>The proposal has been submitted and locked 🔒</h3>
                      </div>
                    ) : (
                      <>
                        <Radio
                          toggle
                          checked={this.state.isPDF}
                          onChange={() => {
                            this.setState({
                              isPDF: !this.state.isPDF,
                            });
                          }}
                        />
                        <span>
                          {this.state.isPDF ? (
                            <div className="preview">
                              Preview
                              <span className="alert">
                                <Icon name="info circle" />
                                <span>
                                  Content from cards marked as "complete" in
                                  edit mode will appear here, in preview mode,
                                  displaying what your reviewers will see.
                                </span>
                              </span>
                            </div>
                          ) : (
                            "Edit"
                          )}
                        </span>
                      </>
                    )}
                  </StyledPreviewToggle>
                  {this.state.isPDF || proposal?.isSubmitted ? (
                    <ProposalPDF proposal={proposal} />
                  ) : (
                    <>
                      <Head>
                        <title>{proposal?.title}</title>
                      </Head>
                      <ProposalContainer
                        {...this.props}
                        proposal={proposal}
                        onClose={this.props.goToOverview}
                        proposalBuildMode={this.props.proposalBuildMode}
                      />
                    </>
                  )}
                </StyledProposalBoard>
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default ProposalPage;
