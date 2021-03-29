import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';

import ChecklistItem from './checklist/index';

// import { PDFDownloadLink } from '@react-pdf/renderer';
// import { MyProposal } from './export/proposal';
import { PROPOSAL_BOARD_QUERY } from '../../../Dashboard/Proposal/proposalpage';

// to do import mutation that updates the proposal and refetches the PROPOSAL_BOARD_QUERY
import { UPDATE_PROPOSAL_BOARD } from '../../../Dashboard/Proposal/ProposalPage/proposalHeader';

const StyledReviewSection = styled.div`
  background: #e5e5e5;
  display: grid;
  justify-content: stretch;
`;

const StyledReviewBoard = styled.div`
  display: grid;
  max-width: 1100px;
  margin: 45px 0px 45px 0px;
  width: 100%;
  justify-self: center;

  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'submit submit'
    'checklist reviews';
  grid-gap: 20px;

  .submit {
    grid-area: submit;
    .submitPanel {
      display: grid;
      grid-template-columns: 4fr 3fr;
    }
    .submitBtnContainer {
      display: grid;
      justify-content: end;
      align-content: baseline;
      margin-top: 16px;
      button {
        border: 2px solid #b3b3b3;
      }
    }
  }
  .checklist {
    grid-area: checklist;
    .checklistItems {
      display: grid;
      grid-gap: 10px;
    }
  }
  .reviews {
    grid-area: reviews;
  }
`;

const StyledReviewCard = styled.div`
  background: white;
  border-radius: 4px;
  padding: 21px 50px 21px 50px;
`;

class ProposalWrapper extends Component {
  state = {
    id: this.props.proposal.id,
  };

  onBtnClick = params => {
    console.log('clicked', params);
    this.exportProposal();
  };

  exportProposal = () => {
    // to do - open a new page with the whole proposal
  };

  submitProposal = async updateProposalMutation => {
    const res = await updateProposalMutation({
      variables: { isSubmitted: true },
    });
    console.log('res', res);
  };

  render() {
    return (
      <Mutation mutation={UPDATE_PROPOSAL_BOARD} variables={this.state}>
        {(updateProposal, { loading, error }) => {
          if (error) {
            alert(`We have an error ${error}`);
          }
          if (loading) {
            return <h3>Updating</h3>;
          }
          return (
            <StyledReviewSection>
              <StyledReviewBoard>
                <StyledReviewCard className="submit">
                  <h2>Ready to send for review?</h2>
                  <div className="submitPanel">
                    <p>
                      When you submit your study as “ready for review,” your
                      proposal and study will become available to peer reviewers
                      from other participating schools to view and review.
                    </p>
                    <div className="submitBtnContainer">
                      <button
                        type="button"
                        style={{
                          display: 'grid',
                          gridGap: '10px',
                          gridTemplateColumns: '30px 1fr',
                          padding: '15px 20px 10px 20px',
                        }}
                        onClick={() => {
                          if (
                            confirm(
                              'Are you sure you want to submit this proposal? You will not be able to undo it later.'
                            )
                          ) {
                            this.submitProposal(updateProposal);
                          }
                        }}
                      >
                        <img
                          src="/static/assets/submit-review.svg"
                          alt="icon"
                        />
                        Submit for review
                      </button>
                    </div>
                  </div>
                </StyledReviewCard>

                <StyledReviewCard className="checklist">
                  <h2>Pre-review checklist</h2>

                  <p>Before you submit for review, make sure to:</p>

                  <div className="checklistItems">
                    {['item 1', 'item 2'].map((item, i) => (
                      <ChecklistItem
                        item={item}
                        key={i}
                        onBtnClick={this.onBtnClick}
                      />
                    ))}
                  </div>
                </StyledReviewCard>

                <StyledReviewCard className="reviews">
                  <h2>Reviews</h2>
                  <p>You don’t have any reviews yet</p>
                  <p>
                    Once you mark your study as ready for review and your peers
                    have reviewed and synthesized their comments, you will see
                    your reviews here.
                  </p>
                </StyledReviewCard>
              </StyledReviewBoard>
            </StyledReviewSection>
          );
        }}
      </Mutation>
    );
  }
}

export default ProposalWrapper;
