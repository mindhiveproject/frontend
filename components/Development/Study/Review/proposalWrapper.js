import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';

import { Icon } from 'semantic-ui-react';
import ChecklistItem from './checklist/index';
import { checklistItems } from './checklist/checkTemplate';
import { PROPOSAL_REVIEWS_QUERY } from './index';
import { UPDATE_PROPOSAL_BOARD } from '../../../Dashboard/Proposal/ProposalPage/proposalHeader';

import ReviewRow from './reviews/row';

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
      margin-top: 18px;
    }
  }
  .reviews {
    grid-area: reviews;
    .reviewsCards {
      display: grid;
      grid-gap: 10px;
      .allReviewsToggle {
        cursor: pointer;
        color: #007c70;
        font-family: Lato;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
        text-decoration-line: underline;
      }
    }
    .reviewsPlaceholder {
      border: 1px solid #e6e6e6;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 40px;
      p {
        text-align: center;
      }
    }
  }
`;

const StyledReviewCard = styled.div`
  background: white;
  border-radius: 4px;
  padding: 41px 50px 21px 50px;
  h2 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }
  p {
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

class ProposalWrapper extends Component {
  state = {
    id: this.props.proposal.id,
    checklist: this.props.proposal.checklist || [],
    showAllReviews: false,
  };

  takeAction = action => {
    if (action === 'export') {
      this.exportProposal();
    }
  };

  exportProposal = () => {
    const url = `/proposals/${this.props.proposal?.slug}`;
    const win = window.open(url, '_blank');
  };

  submitProposal = async updateProposalMutation => {
    const res = await updateProposalMutation({
      variables: { isSubmitted: true },
    });
  };

  toggleCheckTo = async (name, newState, updateProposalMutation) => {
    let checklist;
    if (newState) {
      checklist = [...this.state.checklist, name];
    } else {
      checklist = [...this.state.checklist.filter(item => item !== name)];
    }
    this.setState({
      checklist,
    });
    const res = await updateProposalMutation({
      variables: {
        checklist,
      },
    });
  };

  render() {
    const { proposal } = this.props;

    return (
      <Mutation
        mutation={UPDATE_PROPOSAL_BOARD}
        variables={this.state}
        refetchQueries={[
          {
            query: PROPOSAL_REVIEWS_QUERY,
            variables: { id: this.props.proposal.id },
          },
        ]}
      >
        {(updateProposal, { loading, error }) => {
          if (error) {
            alert(`We have an error ${error}`);
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
                          gridGap: '15px',
                          gridTemplateColumns: '20px 1fr',
                          padding: '15px 20px 10px 20px',
                          background: `${
                            proposal?.isSubmitted ? '#FFF3CD' : '#FFFFFF'
                          }`,
                          border: `${
                            proposal?.isSubmitted
                              ? '2px solid #FFC107'
                              : '2px solid #B3B3B3'
                          }`,
                        }}
                        disabled={proposal?.isSubmitted}
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
                        {proposal?.isSubmitted ? (
                          <Icon
                            name="check"
                            style={{
                              color: '#FFC107',
                            }}
                          />
                        ) : (
                          <img
                            src="/static/assets/submit-review.svg"
                            alt="icon"
                          />
                        )}

                        {proposal?.isSubmitted
                          ? 'Submitted for review'
                          : 'Submit for review'}
                      </button>
                    </div>
                  </div>
                </StyledReviewCard>

                <StyledReviewCard className="checklist">
                  <h2>Pre-review checklist</h2>

                  <p>Before you submit for review, make sure to:</p>

                  <div className="checklistItems">
                    {checklistItems.map((item, i) => (
                      <ChecklistItem
                        item={item}
                        key={i}
                        isComplete={this.state.checklist.includes(item.name)}
                        toggleCheckTo={this.toggleCheckTo}
                        updateProposalMutation={updateProposal}
                        takeAction={this.takeAction}
                      />
                    ))}
                  </div>
                </StyledReviewCard>

                <StyledReviewCard className="reviews">
                  <h2>Reviews</h2>
                  {proposal?.reviews && proposal?.reviews.length ? (
                    <div className="reviewsCards">
                      <p>
                        All individual reviews and syntheses are available here:
                      </p>
                      {proposal.reviews
                        .filter(review => review.stage === 'SYNTHESIS')
                        .map((review, num) => (
                          <ReviewRow
                            key={num}
                            number={num + 1}
                            review={review}
                            stage="SYNTHESIS"
                            selectReview={this.props.selectReview}
                          />
                        ))}

                      <a
                        className="allReviewsToggle"
                        onClick={() =>
                          this.setState({
                            showAllReviews: !this.state.showAllReviews,
                          })
                        }
                      >
                        {this.state.showAllReviews ? 'Hide' : 'Show'} all
                        reviews
                      </a>

                      {this.state.showAllReviews && (
                        <>
                          {proposal.reviews
                            .filter(review => review.stage === 'INDIVIDUAL')
                            .map((review, num) => (
                              <ReviewRow
                                key={num}
                                number={num + 1}
                                review={review}
                                stage="INDIVIDUAL"
                                selectReview={this.props.selectReview}
                              />
                            ))}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="reviewsPlaceholder">
                      <p>
                        <strong>You don’t have any reviews yet</strong>
                      </p>
                      <p>
                        Once you mark your study as ready for review and your
                        peers have reviewed and synthesized their comments, you
                        will see your reviews here.
                      </p>
                    </div>
                  )}
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
