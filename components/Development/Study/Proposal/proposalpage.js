import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import Head from 'next/head';
import { Radio } from 'semantic-ui-react';
import styled from 'styled-components';
import Error from '../../../ErrorMessage/index';

import ProposalContainer from '../../../Dashboard/Proposal/Board/index';
import ProposalPDF from '../../../Proposal/pdf';

import {
  StyledDasboard,
  StyledDevelopDasboard,
} from '../../../Dashboard/styles';

const StyledProposalBoard = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledPreviewToggle = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  margin: 1rem 0rem;
  align-items: center;
  span {
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.05em;
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
              if (!data?.proposalBoard)
                return <p>No proposal found for {proposalId}</p>;
              const proposal = data.proposalBoard;

              return (
                <StyledProposalBoard>
                  <StyledPreviewToggle>
                    <Radio
                      toggle
                      checked={this.state.isPDF}
                      onChange={() => {
                        this.setState({
                          isPDF: !this.state.isPDF,
                        });
                      }}
                    />
                    <span>{this.state.isPDF ? 'Preview' : 'Edit'}</span>
                  </StyledPreviewToggle>
                  {!this.state.isPDF ? (
                    <>
                      <Head>
                        <title>{proposal.title}</title>
                      </Head>
                      <ProposalContainer
                        {...this.props}
                        proposal={proposal}
                        onClose={this.props.goBack}
                        proposalBuildMode={this.props.proposalBuildMode}
                      />
                    </>
                  ) : (
                    <ProposalPDF proposal={proposal} />
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
export { PROPOSAL_BOARD_QUERY };
